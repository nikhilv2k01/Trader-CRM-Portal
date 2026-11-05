
import { useTranslation } from "react-i18next";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}) {
  const { t } = useTranslation();

  return (
    <div className="section-heading">
      <div>
        {eyebrow && (
          <p className="eyebrow">{t(eyebrow)}</p>
        )}

        <h1 className="page-title">{t(title)}</h1>

        {description && (
          <p className="muted heading-description">
            {t(description)}
          </p>
        )}
      </div>

      {action && <div>{action}</div>}
    </div>
  );
}
