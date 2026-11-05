import { useMemo, useState } from "react";
import { FileText, Clock3, CheckCircle2, Download, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";
import "../styles/Statements.css";

const statementData = [
  // 2026
  { id: 1, month: "October", year: 2026, currency: "USD", pending: true },
  { id: 2, month: "October", year: 2026, currency: "EUR", pending: true },
  {
    id: 3,
    month: "September",
    year: 2026,
    currency: "USD",
    pending: false,
    issued: "Oct 1, 2026",
  },
  {
    id: 4,
    month: "September",
    year: 2026,
    currency: "EUR",
    pending: false,
    issued: "Oct 1, 2026",
  },
  {
    id: 5,
    month: "August",
    year: 2026,
    currency: "USD",
    pending: false,
    issued: "Sep 1, 2026",
  },
  {
    id: 6,
    month: "August",
    year: 2026,
    currency: "EUR",
    pending: false,
    issued: "Sep 1, 2026",
  },
  {
    id: 7,
    month: "July",
    year: 2026,
    currency: "USD",
    pending: false,
    issued: "Aug 1, 2026",
  },
  {
    id: 8,
    month: "July",
    year: 2026,
    currency: "EUR",
    pending: false,
    issued: "Aug 1, 2026",
  },
  {
    id: 9,
    month: "June",
    year: 2026,
    currency: "USD",
    pending: false,
    issued: "Jul 1, 2026",
  },
  {
    id: 10,
    month: "June",
    year: 2026,
    currency: "EUR",
    pending: false,
    issued: "Jul 1, 2026",
  },
  {
    id: 11,
    month: "May",
    year: 2026,
    currency: "USD",
    pending: false,
    issued: "Jun 1, 2026",
  },
  {
    id: 12,
    month: "May",
    year: 2026,
    currency: "EUR",
    pending: false,
    issued: "Jun 1, 2026",
  },
  {
    id: 13,
    month: "April",
    year: 2026,
    currency: "USD",
    pending: false,
    issued: "May 1, 2026",
  },
  {
    id: 14,
    month: "April",
    year: 2026,
    currency: "EUR",
    pending: false,
    issued: "May 1, 2026",
  },
  {
    id: 15,
    month: "March",
    year: 2026,
    currency: "USD",
    pending: false,
    issued: "Apr 1, 2026",
  },
  {
    id: 16,
    month: "March",
    year: 2026,
    currency: "EUR",
    pending: false,
    issued: "Apr 1, 2026",
  },
  {
    id: 17,
    month: "February",
    year: 2026,
    currency: "USD",
    pending: false,
    issued: "Mar 1, 2026",
  },
  {
    id: 18,
    month: "February",
    year: 2026,
    currency: "EUR",
    pending: false,
    issued: "Mar 1, 2026",
  },
  {
    id: 19,
    month: "January",
    year: 2026,
    currency: "USD",
    pending: false,
    issued: "Feb 1, 2026",
  },

  // 2025
  {
    id: 20,
    month: "December",
    year: 2025,
    currency: "USD",
    pending: false,
    issued: "Jan 1, 2026",
  },
  {
    id: 21,
    month: "November",
    year: 2025,
    currency: "USD",
    pending: false,
    issued: "Dec 1, 2025",
  },
  {
    id: 22,
    month: "October",
    year: 2025,
    currency: "USD",
    pending: false,
    issued: "Nov 1, 2025",
  },
  {
    id: 23,
    month: "September",
    year: 2025,
    currency: "USD",
    pending: false,
    issued: "Oct 1, 2025",
  },
  {
    id: 24,
    month: "August",
    year: 2025,
    currency: "USD",
    pending: false,
    issued: "Sep 1, 2025",
  },
];

const defaultStatement = statementData.find((item) => item.id === 3);

export default function Statements() {
  const { t } = useTranslation();

  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(defaultStatement);
  const [downloaded, setDownloaded] = useState([]);
  const [generated, setGenerated] = useState(false);

  const filteredStatements = useMemo(() => {
    return statementData.filter(
      (item) => filter === "All" || item.currency === filter,
    );
  }, [filter]);

  const groupedStatements = useMemo(() => {
    return [2026, 2025].map((year) => ({
      year,
      items: filteredStatements.filter((item) => item.year === year),
    }));
  }, [filteredStatements]);

  const readyCount = statementData.filter((item) => !item.pending).length;
  const pendingCount = statementData.filter((item) => item.pending).length;

  const handleFilter = (value) => {
    setFilter(value);

    if (selected && value !== "All" && selected.currency !== value) {
      const next = statementData.find(
        (item) => item.currency === value && !item.pending,
      );
      setSelected(next || null);
    } else if (!selected && value !== "All") {
      const next = statementData.find(
        (item) => item.currency === value && !item.pending,
      );
      setSelected(next || null);
    } else if (!selected && value === "All") {
      setSelected(defaultStatement);
    }
  };

  const handleDownload = (item) => {
    if (item.pending) return;

    setSelected(item);
    setDownloaded((previous) =>
      previous.includes(item.id) ? previous : [...previous, item.id],
    );
  };

  const handleGenerate = () => {
    setGenerated(true);
  };

  const isDownloaded = (id) => downloaded.includes(id);

  return (
    <div className="statements-page">
      {/* Page heading */}
      <div className="statements-heading">
        <div>
          <p className="eyebrow">{t("statements")}</p>
          <h1>{t("account_statements")}</h1>
          <p className="muted">{t("statements_page_description")}</p>
        </div>

        <button
          className="button primary generate-pdf"
          onClick={handleGenerate}
        >
          {generated ? (
            <>
              <CheckCircle2 size={15} />
              {t("request_recorded")}
            </>
          ) : (
            t("generate_pdf")
          )}
        </button>
      </div>

      {/* Summary */}
      <div className="statement-stats">
        <div>
          <strong>{readyCount}</strong>
          <span>{t("ready_to_download")}</span>
        </div>

        <div>
          <strong>{pendingCount}</strong>
          <span>{t("pending")}</span>
        </div>

        <div>
          <strong>2</strong>
          <span>{t("years_on_file")}</span>
        </div>
      </div>

      <div className="statements-divider" />

      {/* Main layout */}
      <div className="statements-grid">
        {/* Archive */}
        <section className="panel statement-archive">
          <div className="archive-header">
            <div>
              <p className="eyebrow">{t("archive")}</p>
              <h2>{t("issued_periods")}</h2>
            </div>

            <div className="statement-filters">
              {["All", "EUR", "USD"].map((value) => (
                <button
                  key={value}
                  className={filter === value ? "active" : ""}
                  onClick={() => handleFilter(value)}
                >
                  {value === "All" ? t("all") : value}
                </button>
              ))}
            </div>
          </div>

          <div className="archive-scroll">
            {groupedStatements.map(
              ({ year, items }) =>
                items.length > 0 && (
                  <div className="archive-year" key={year}>
                    <div className="archive-year-heading">
                      <strong>{year}</strong>
                      <span>{t("periods_count", { count: items.length })}</span>
                    </div>

                    <div className="statement-list">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className={`statement-item ${
                            selected?.id === item.id ? "selected" : ""
                          }`}
                          onClick={() => !item.pending && setSelected(item)}
                        >
                          <span
                            className={`statement-icon ${
                              item.pending ? "pending" : ""
                            }`}
                          >
                            {item.pending ? (
                              <Clock3 size={15} />
                            ) : (
                              <FileText size={15} />
                            )}
                          </span>

                          <div className="statement-info">
                            <strong>
                              {t(`month_${item.month.toLowerCase()}`)}{" "}
                              {item.year}
                            </strong>

                            <small>
                              {item.currency}
                              {item.pending
                                ? ` · ${t("available_after_month_end_settlement")}`
                                : ` · ${t("issued")} ${item.issued}`}
                            </small>
                          </div>

                          {item.pending ? (
                            <span className="pending-badge">
                              {t("pending")}
                            </span>
                          ) : (
                            <button
                              className="button primary download-button"
                              onClick={(event) => {
                                event.stopPropagation();
                                handleDownload(item);
                              }}
                            >
                              {isDownloaded(item.id) ? (
                                <CheckCircle2 size={15} />
                              ) : (
                                <span>{t("download")}</span>
                              )}
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ),
            )}

            {filteredStatements.length === 0 && (
              <div className="empty-statements">
                {t("no_statements_available")}
              </div>
            )}
          </div>
        </section>

        {/* Right side */}
        <div className="statements-side">
          {/* Most recent */}
          <section className="panel recent-statement">
            <p className="eyebrow">{t("most_recent")}</p>

            {selected ? (
              <>
                <h2>
                  {t(`month_${selected.month.toLowerCase()}`)} {selected.year}
                </h2>

                <p className="recent-meta">
                  {selected.currency} · {t("issued")} {selected.issued}
                </p>

                <p className="muted recent-description">
                  {t("monthly_statement_description", {
                    currency: selected.currency,
                  })}
                </p>

                <button
                  className="button primary recent-download"
                  onClick={() => handleDownload(selected)}
                >
                  {isDownloaded(selected.id) ? (
                    <>
                      <CheckCircle2 size={15} />
                      {t("download_confirmed")}
                    </>
                  ) : (
                    `${t("download")} ${t(
                      `month_${selected.month.toLowerCase()}`,
                    )} ${selected.year}`
                  )}
                </button>
              </>
            ) : (
              <>
                <h2>{t("no_statement_selected")}</h2>
                <p className="muted">{t("select_issued_statement")}</p>
              </>
            )}
          </section>

          {/* About */}
          <section className="panel document-info">
            <p className="eyebrow">{t("about_these_documents")}</p>
            <h2>{t("what_you_receive")}</h2>

            <ul>
              <li>{t("statement_scope_description")}</li>
              <li>{t("broker_record_description")}</li>
              <li>{t("broker_branding_description")}</li>
              <li>{t("month_end_settlement_description")}</li>
            </ul>
          </section>
        </div>
      </div>

      {/* Footer note */}
      <div className="statements-footer">
        <span>{t("hx_nexus_trader_workspace")}</span>
        <span>{t("broker_managed_footer")}</span>
      </div>
    </div>
  );
}
