import type { Architecture } from "@/data/profile";

function Column({ label, items, core }: { label: string; items: string[]; core?: boolean }) {
  return (
    <div className={`arch-col${core ? " is-core" : ""}`}>
      <p className="arch-label">{label}</p>
      <ul>
        {items.map((item) => (
          <li key={item} className="arch-node">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

const Flow = ({ vertical }: { vertical?: boolean }) => (
  <div className={`arch-flow${vertical ? " is-vertical" : ""}`} aria-hidden="true">
    <span />
  </div>
);

/** Clients call one API; the API owns the data and talks to outside services. Columns with nothing known are left out. */
export function ArchitectureDiagram({ architecture: a }: { architecture: Architecture }) {
  return (
    <figure className="arch">
      <div className="arch-row">
        <Column label="Clients" items={a.clients} />
        <Flow />
        <Column label="Backend" items={[a.api]} core />
        {a.data.length > 0 ? (
          <>
            <Flow />
            <Column label="Data" items={a.data} />
          </>
        ) : (
          // Keeps the backend centred over the line down to services.
          <div className="arch-spacer" aria-hidden="true" />
        )}
      </div>
      {a.services.length > 0 && (
        <>
          <Flow vertical />
          <div className="arch-services">
            <Column label="Integrations and services" items={a.services} />
          </div>
        </>
      )}
      <figcaption>How the pieces connect, drawn from the stack and features above.</figcaption>
    </figure>
  );
}
