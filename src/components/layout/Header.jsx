
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Bell,
  Globe,
  Menu,
  Moon,
  Sun,
  ChevronDown,
  LogOut,
  Search,
  X,
  Check,
  CheckCheck,
  CircleCheck,
  Gift,
  ShieldCheck,
  MessageSquareText,
  ArrowRight,
} from "lucide-react";
import "../../styles/Notifications.css";

const pageTitles = {
  "/": "Dashboard",
  "/accounts": "Accounts",
  "/accounts/new": "Accounts",
  "/fund": "Fund",
  "/transfer": "Transfer",
  "/statements": "Statements",
  "/rewards": "Rewards",
  "/games": "Games",
  "/referrals": "Referrals",
  "/support": "Support",
  "/onboarding": "Onboarding",
  "/profile": "Profile",
};

const languages = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "fr", name: "French", nativeName: "Français" },
  { code: "es", name: "Spanish", nativeName: "Español" },
  { code: "pt", name: "Portuguese", nativeName: "Português" },
  { code: "pt-BR", name: "Brazilian Portuguese", nativeName: "Português (Brasil)" },
  { code: "it", name: "Italian", nativeName: "Italiano" },
  { code: "ar", name: "Arabic", nativeName: "العربية" },
  { code: "de", name: "German", nativeName: "Deutsch" },
  { code: "nl", name: "Dutch", nativeName: "Nederlands" },
  { code: "ru", name: "Russian", nativeName: "Русский" },
  { code: "zh", name: "Chinese", nativeName: "中文" },
  { code: "ja", name: "Japanese", nativeName: "日本語" },
  { code: "ko", name: "Korean", nativeName: "한국어" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు" },
  { code: "tr", name: "Turkish", nativeName: "Türkçe" },
  { code: "pl", name: "Polish", nativeName: "Polski" },
  { code: "sv", name: "Swedish", nativeName: "Svenska" },
  { code: "id", name: "Indonesian", nativeName: "Bahasa Indonesia" },
  { code: "th", name: "Thai", nativeName: "ไทย" },
  { code: "vi", name: "Vietnamese", nativeName: "Tiếng Việt" },
];

const initialNotifications = [
  {
    id: 1,
    category: "SETTLEMENT",
    title: "Prediction settled",
    description:
      "Market predictor for EUR/USD is scored. Community split and points are ready to refresh.",
    date: "Aug 28, 12:42 UTC",
    section: "new",
    read: false,
    route: "/games",
    icon: "settlement",
  },
  {
    id: 2,
    category: "REWARD",
    title: "Reward request updated",
    description:
      "Your voucher request moved to broker review. No trading incentive is involved.",
    date: "Aug 28, 10:18 UTC",
    section: "new",
    read: false,
    route: "/rewards",
    icon: "reward",
  },
  {
    id: 3,
    category: "KYC",
    title: "Verification document received",
    description:
      "The broker recorded your identity upload. Status stays pending until review completes.",
    date: "Aug 27, 15:36 UTC",
    section: "earlier",
    read: true,
    route: "/onboarding",
    icon: "kyc",
  },
  {
    id: 4,
    category: "SUPPORT",
    title: "Support reply available",
    description:
      "Your workspace ticket has a new broker message. Open support when available.",
    date: "Aug 27, 09:05 UTC",
    section: "earlier",
    read: true,
    route: "/support",
    icon: "support",
  },
];

const NotificationIcon = ({ type }) => {
  switch (type) {
    case "settlement":
      return <CircleCheck size={20} />;

    case "reward":
      return <Gift size={20} />;

    case "kyc":
      return <ShieldCheck size={20} />;

    case "support":
      return <MessageSquareText size={20} />;

    default:
      return <Bell size={20} />;
  }
};

export default function Header({ onMenu, dark, onToggleTheme }) {
  const [lang, setLang] = useState(false);
  const [searchLanguage, setSearchLanguage] = useState("");
  const [snapshotOpen, setSnapshotOpen] = useState(false);

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notificationFilter, setNotificationFilter] = useState("all");
  const [notifications, setNotifications] = useState(initialNotifications);

  const languageRef = useRef(null);
  const notificationRef = useRef(null);

  const { i18n, t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const pageTitle = pageTitles[location.pathname] || "Dashboard";

  const unreadCount = notifications.filter(
    (notification) => !notification.read,
  ).length;

  const currentLanguage =
    languages.find(
      (item) =>
        item.code.toLowerCase() ===
        (i18n.resolvedLanguage || i18n.language || "en").toLowerCase(),
    ) || languages[0];

  const filteredLanguages = languages.filter((item) => {
    const search = searchLanguage.toLowerCase();

    return (
      item.name.toLowerCase().includes(search) ||
      item.nativeName.toLowerCase().includes(search) ||
      item.code.toLowerCase().includes(search)
    );
  });

  const filteredNotifications = useMemo(() => {
    if (notificationFilter === "unread") {
      return notifications.filter((notification) => !notification.read);
    }

    return notifications;
  }, [notifications, notificationFilter]);

  const newNotifications = filteredNotifications.filter(
    (notification) => notification.section === "new",
  );

  const earlierNotifications = filteredNotifications.filter(
    (notification) => notification.section === "earlier",
  );

  const handleNotificationClick = (notification) => {
    setNotifications((previous) =>
      previous.map((item) =>
        item.id === notification.id ? { ...item, read: true } : item,
      ),
    );

    setNotificationsOpen(false);
    navigate(notification.route);
  };

  const handleMarkAllAsRead = () => {
    setNotifications((previous) =>
      previous.map((notification) => ({
        ...notification,
        read: true,
      })),
    );
  };

  const handleLanguageChange = async (language) => {
    try {
      await i18n.changeLanguage(language.code);
      localStorage.setItem("appLanguage", language.code);
      setLang(false);
      setSearchLanguage("");
    } catch (error) {
      console.error("Unable to change language:", error);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        languageRef.current &&
        !languageRef.current.contains(event.target)
      ) {
        setLang(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setLang(false);
        setNotificationsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const renderNotification = (notification) => (
    <div
      className={`notification-card ${
        notification.read ? "is-read" : "is-unread"
      }`}
      key={notification.id}
    >
      <div className={`notification-item-icon ${notification.icon}`}>
        <NotificationIcon type={notification.icon} />
      </div>

      <button
        type="button"
        className="notification-content"
        onClick={() => handleNotificationClick(notification)}
      >
        <span className="notification-category">
          {notification.category}
        </span>

        <strong className="notification-title">
          {notification.title}
        </strong>

        <span className="notification-description">
          {notification.description}
        </span>

        <span className="notification-open-link">
          {t("open_update")}
          <ArrowRight size={14} />
        </span>
      </button>

      <div className="notification-meta">
        <time>{notification.date}</time>

        {notification.read ? (
          <Check size={16} className="notification-read-check" />
        ) : (
          <span className="notification-unread-dot" />
        )}
      </div>
    </div>
  );

  return (
    <>
      <header className="topbar">
        <button className="menu-toggle" onClick={onMenu}>
          <Menu />
        </button>

        <div className="topbar-title">
          <div className="page-heading">
            <b>{t(pageTitle.toLowerCase())}</b>
          </div>

          <button
            className="snapshot-toggle"
            onClick={() => setSnapshotOpen((prev) => !prev)}
          >
            <span className="live-dot" />
            {t("demo_snapshot")}
            <ChevronDown
              size={12}
              className={snapshotOpen ? "rotated" : ""}
            />
          </button>
        </div>

        <div className="top-actions">
          {/* Theme switch */}
          <button
            className={`theme-toggle ${
              dark ? "dark-active" : "light-active"
            }`}
            onClick={onToggleTheme}
            title={dark ? t("switch_to_light_mode") : t("switch_to_dark_mode")}
            aria-label={
              dark ? t("switch_to_light_mode") : t("switch_to_dark_mode")
            }
          >
            <span className="theme-option sun-option">
              <Sun size={15} />
            </span>

            <span className="theme-option moon-option">
              <Moon size={15} />
            </span>
          </button>

          {/* Language selector */}
          <div className="language-wrap" ref={languageRef}>
            <button
              className={`top-button language-button ${
                lang ? "language-button-active" : ""
              }`}
              onClick={() => setLang((prev) => !prev)}
              aria-expanded={lang}
              aria-label={t("select_language")}
            >
              <Globe size={16} />
              <span>{currentLanguage.name}</span>
              <ChevronDown
                size={14}
                className={lang ? "language-chevron-open" : ""}
              />
            </button>

            {lang && (
              <div className="language-dropdown-panel">
                <div className="language-panel-header">
                  <h3>{t("language")}</h3>

                  <button
                    className="language-close"
                    onClick={() => {
                      setLang(false);
                      setSearchLanguage("");
                    }}
                    aria-label={t("close_language_selector")}
                  >
                    <X size={19} />
                  </button>
                </div>

                <div className="language-search">
                  <Search size={18} />

                  <input
                    type="text"
                    placeholder={t("search_languages")}
                    value={searchLanguage}
                    onChange={(event) =>
                      setSearchLanguage(event.target.value)
                    }
                    autoComplete="off"
                  />

                  {searchLanguage && (
                    <button
                      className="language-clear"
                      onClick={() => setSearchLanguage("")}
                      aria-label={t("clear_search")}
                    >
                      <X size={15} />
                    </button>
                  )}
                </div>

                <div className="language-list">
                  {filteredLanguages.length > 0 ? (
                    filteredLanguages.map((language) => {
                      const isSelected =
                        language.code.toLowerCase() ===
                        (i18n.resolvedLanguage ||
                          i18n.language ||
                          "en").toLowerCase();

                      return (
                        <button
                          key={language.code}
                          className={`language-option ${
                            isSelected ? "selected" : ""
                          }`}
                          onClick={() => handleLanguageChange(language)}
                        >
                          <span className="language-option-text">
                            <strong>{language.nativeName}</strong>

                            {!isSelected && (
                              <small>{language.name}</small>
                            )}
                          </span>

                          <span className="language-option-right">
                            <span className="language-code">
                              {language.code === "pt-BR"
                                ? "BR"
                                : language.code.toUpperCase()}
                            </span>

                            {isSelected && (
                              <Check
                                size={18}
                                className="language-check"
                              />
                            )}
                          </span>
                        </button>
                      );
                    })
                  ) : (
                    <div className="language-no-results">
                      {t("no_languages_found")}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="notification-wrap" ref={notificationRef}>
            <button
              type="button"
              className={`icon-button notification ${
                notificationsOpen ? "notification-active" : ""
              }`}
              onClick={() => setNotificationsOpen((prev) => !prev)}
              aria-label={t("notifications")}
              aria-expanded={notificationsOpen}
            >
              <Bell size={19} />

              {unreadCount > 0 && <i>{unreadCount}</i>}
            </button>

            {notificationsOpen && (
              <div className="notification-panel">
                {/* Panel header */}
                <div className="notification-panel-header">
                  <div className="notification-header-icon">
                    <Bell size={23} />
                    {unreadCount > 0 && (
                      <span className="notification-header-dot" />
                    )}
                  </div>

                  <div className="notification-header-content">
                    <span className="notification-panel-eyebrow">
                      {t("inbox")}
                    </span>

                    <h2>{t("notifications")}</h2>

                    <p>
                      {t("unread_notifications", {
                        count: unreadCount,
                      })}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="notification-close"
                    onClick={() => setNotificationsOpen(false)}
                    aria-label={t("close_notifications")}
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Filter controls */}
                <div className="notification-toolbar">
                  <div className="notification-tabs">
                    <button
                      type="button"
                      className={
                        notificationFilter === "all" ? "active" : ""
                      }
                      onClick={() => setNotificationFilter("all")}
                    >
                      {t("all")}
                      <span>{notifications.length}</span>
                    </button>

                    <button
                      type="button"
                      className={
                        notificationFilter === "unread" ? "active" : ""
                      }
                      onClick={() => setNotificationFilter("unread")}
                    >
                      {t("unread")}
                      <span>{unreadCount}</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    className="mark-all-read"
                    onClick={handleMarkAllAsRead}
                    disabled={unreadCount === 0}
                  >
                    <CheckCheck size={16} />
                    <span>{t("mark_all_as_read")}</span>
                  </button>
                </div>

                {/* Notification list */}
                <div className="notification-list">
                  {filteredNotifications.length > 0 ? (
                    <>
                      {newNotifications.length > 0 && (
                        <section className="notification-group">
                          <div className="notification-group-heading">
                            <span>{t("new")}</span>
                            <small>{newNotifications.length}</small>
                          </div>

                          {newNotifications.map(renderNotification)}
                        </section>
                      )}

                      {earlierNotifications.length > 0 && (
                        <section className="notification-group">
                          <div className="notification-group-heading">
                            <span>{t("earlier")}</span>
                            <small>{earlierNotifications.length}</small>
                          </div>

                          {earlierNotifications.map(renderNotification)}
                        </section>
                      )}
                    </>
                  ) : (
                    <div className="notification-empty">
                      <div>
                        <CheckCheck size={25} />
                      </div>

                      <strong>{t("all_caught_up")}</strong>
                      <p>{t("no_unread_notifications")}</p>
                    </div>
                  )}
                </div>

                {/* Panel footer */}
                <div className="notification-panel-footer">
                  <span>
                    <i />
                    {t("demo_snapshot")}
                  </span>

                  <strong>
                    {t("notifications_count", {
                      count: notifications.length,
                    })}
                  </strong>
                </div>
              </div>
            )}
          </div>

          {/* User profile */}
          <button className="profile-chip">
            <span className="avatar small">D</span>
            <span>
              <b>Dana</b>
              <small>Dana</small>
            </span>
          </button>

          {/* Sign out */}
          <button className="top-button signout">
            <LogOut size={15} />
            {t("sign_out")}
          </button>
        </div>
      </header>

      {/* Demo snapshot */}
      {snapshotOpen && (
        <div className="snapshot-container">
          <div className="snapshot-scroll">
            <div className="snapshot-item">
              <span className="snapshot-status-dot" />
              <span className="snapshot-label">{t("workspace")}</span>
              <strong>{t("demo_snapshot")}</strong>
            </div>

            <div className="snapshot-item">
              <span className="snapshot-label">{t("multi_factor")}</span>
              <strong className="snapshot-success">{t("enabled")}</strong>
            </div>

            <div className="snapshot-item">
              <span className="snapshot-label">{t("active_sessions")}</span>
              <strong>2</strong>
            </div>

            <div className="snapshot-item">
              <span className="snapshot-label">{t("locale")}</span>
              <strong>{i18n.language || "en"}</strong>
            </div>

            <div className="snapshot-item">
              <span className="snapshot-label">{t("product_updates")}</span>
              <strong>{t("on")}</strong>
            </div>

            <div className="snapshot-item">
              <span className="snapshot-label">{t("marketing_email")}</span>
              <strong>{t("off")}</strong>
            </div>

            <div className="snapshot-item">
              <span className="snapshot-label">{t("client_id")}</span>
              <strong>••••rga</strong>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
