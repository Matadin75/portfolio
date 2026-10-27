import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SkillsExplorer } from "@/components/SkillsExplorer";
import { projects, skills } from "@/data/profile";
import { projectsUsing } from "@/lib/skills";

const names = (skill: string) => projectsUsing(skill, projects).map((p) => p.name);

describe("projectsUsing", () => {
  it("finds a skill in a project's stack", () => {
    expect(names("SignalR")).toEqual(["SecondSpace", "YouToo"]);
  });

  it("doesn't mistake one name for a longer one", () => {
    expect(names("React")).toEqual([]); // only "React Native" appears in the projects
    expect(names("Vite")).toEqual(["ICE Games"]); // not every Vitest mention
    expect(names("Java")).toEqual([]);
  });

  it("finds skills that show up under another name", () => {
    expect(names("C#")).toEqual(["ICE Games", "SecondSpace", "YouToo", "Uptooyoo", "ForFishSake"]);
    expect(names("App Store / Google Play billing")).toContain("YouToo");
  });

  it("matches what each project's stack lists", () => {
    expect(names("Docker")).toEqual(["ICE Games", "SecondSpace", "YouToo", "Uptooyoo", "ForFishSake"]);
    expect(names("Firebase")).toEqual(["ICE Games", "SecondSpace", "YouToo", "Uptooyoo", "ForFishSake"]);
    expect(names("OneSignal")).toEqual(["ICE Games", "SecondSpace", "YouToo", "Uptooyoo", "ForFishSake"]);
    expect(names("Google Maps")).toEqual(["SecondSpace", "YouToo"]);
    expect(names("Claude API")).toEqual(["ICE Games"]);
    expect(names("Identity / JWT")).toEqual(["ICE Games", "SecondSpace", "YouToo", "Uptooyoo", "ForFishSake"]);
  });

  it("handles every listed skill", () => {
    for (const item of skills.flatMap((g) => g.items)) expect(() => projectsUsing(item, projects)).not.toThrow();
  });
});

describe("SkillsExplorer", () => {
  const readout = () => screen.getByText(/Pick a technology|is in|part of my toolkit/).closest("div")!;

  it("shows every group and skill", () => {
    render(<SkillsExplorer groups={skills} projects={projects} />);
    for (const g of skills) {
      const group = screen.getByRole("group", { name: g.group });
      expect(within(group).getAllByRole("button")).toHaveLength(g.items.length);
    }
  });

  it("lists the projects a picked skill shipped in, linked to their case studies", async () => {
    render(<SkillsExplorer groups={skills} projects={projects} />);
    await userEvent.click(screen.getByRole("button", { name: "SignalR" }));
    expect(screen.getByRole("button", { name: "SignalR" })).toHaveAttribute("aria-pressed", "true");
    expect(within(readout()).getByRole("link", { name: "SecondSpace" })).toHaveAttribute("href", "/projects/secondspace");
  });

  it("is honest about skills the featured projects don't use", async () => {
    render(<SkillsExplorer groups={skills} projects={projects} />);
    await userEvent.click(screen.getByRole("button", { name: "Xamarin.Forms" }));
    expect(readout()).toHaveTextContent("Xamarin.Forms is part of my toolkit, but not in the five featured projects.");
  });

  it("clears when the same skill is picked again", async () => {
    render(<SkillsExplorer groups={skills} projects={projects} />);
    const button = screen.getByRole("button", { name: "MySQL" });
    await userEvent.click(button);
    await userEvent.click(button);
    expect(button).toHaveAttribute("aria-pressed", "false");
    expect(readout()).toHaveTextContent("Pick a technology");
  });
});
