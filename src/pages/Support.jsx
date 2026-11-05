import { useMemo, useState } from "react";
import {
  Search,
  X,
  Ticket,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Send,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import "../styles/Support.css";

const initialTickets = [
  {
    id: 1,
    subject: "Withdrawal timing for bank transfer",
    category: "Funding",
    opened: "Aug 11, 2026, 10:12 AM",
    updated: "Aug 11, 2026, 3:40 PM",
    reference: "tkt-2026-0811-a",
    status: "Waiting For Broker",
    replies: [
      {
        author: "You",
        message: "When should my bank-transfer withdrawal complete?",
        time: "Aug 11, 2026, 10:12 AM",
        type: "user",
      },
      {
        author: "Broker Support",
        message:
          "The payment desk is reviewing it. We will update this ticket as soon as the bank reference is available.",
        time: "Aug 11, 2026, 3:40 PM",
        type: "support",
      },
    ],
  },
  {
    id: 2,
    subject: "MT5 mobile login guidance",
    category: "Platform",
    opened: "Aug 5, 2026, 8:20 AM",
    updated: "Aug 6, 2026, 1:05 PM",
    reference: "tkt-2026-0805-b",
    status: "Resolved",
    replies: [
      {
        author: "You",
        message: "Where can I find the server details for MT5 mobile?",
        time: "Aug 5, 2026, 8:20 AM",
        type: "user",
      },
      {
        author: "Broker Support",
        message:
          "Open the account details page and use the platform credentials section. The server itself remains broker-managed.",
        time: "Aug 6, 2026, 1:05 PM",
        type: "support",
      },
    ],
  },
];

const announcements = [
  {
    id: 1,
    title: "Support hours for 12 Aug 2026",
    description:
      "Client support is available 07:00–19:00 UTC on weekdays. Payment review may take longer during settlement windows.",
    date: "Aug 10, 2026, 9:00 AM",
    status: "Information",
  },
  {
    id: 2,
    title: "Document refresh recommended",
    description:
      "If your address proof is older than 90 days, upload a fresh copy from Verification before requesting higher limits.",
    date: "Aug 8, 2026, 11:30 AM",
    status: "Action Required",
  },
];

const supportTextKeys = {
  subjects: {
    "Withdrawal timing for bank transfer": "ticket_withdrawal_timing",
    "MT5 mobile login guidance": "ticket_mt5_mobile_guidance",
  },
  messages: {
    "When should my bank-transfer withdrawal complete?":
      "ticket_withdrawal_question",
    "The payment desk is reviewing it. We will update this ticket as soon as the bank reference is available.":
      "ticket_withdrawal_reply",
    "Where can I find the server details for MT5 mobile?":
      "ticket_mt5_question",
    "Open the account details page and use the platform credentials section. The server itself remains broker-managed.":
      "ticket_mt5_reply",
  },
  announcements: {
    "Support hours for 12 Aug 2026": "support_hours_announcement",
    "Client support is available 07:00–19:00 UTC on weekdays. Payment review may take longer during settlement windows.":
      "support_hours_description",
    "Document refresh recommended": "document_refresh_announcement",
    "If your address proof is older than 90 days, upload a fresh copy from Verification before requesting higher limits.":
      "document_refresh_description",
  },
};

const categoryKeys = {
  Funding: "funding",
  Platform: "platform",
  General: "general",
  Verification: "verification",
  "Platform / MT5": "platform_mt5",
};

const authorKeys = {
  You: "you",
  "Broker Support": "broker_support",
};

const statusKeys = {
  Resolved: "resolved",
  Open: "open",
  "Waiting For Broker": "waiting_for_broker",
};

const announcementStatusKeys = {
  Information: "information",
  "Action Required": "action_required",
};

function StatusBadge({ status, t }) {
  const className =
    status === "Resolved"
      ? "status-resolved"
      : status === "Open"
        ? "status-open"
        : "status-waiting";

  return (
    <span className={`support-status ${className}`}>
      {t(statusKeys[status] || status)}
    </span>
  );
}

export default function Support() {
  const { t } = useTranslation();

  const [tickets] = useState(initialTickets);
  const [selectedTicketId, setSelectedTicketId] = useState(1);
  const [search, setSearch] = useState("");
  const [showNewTicket, setShowNewTicket] = useState(false);
  const [showLiveChat, setShowLiveChat] = useState(false);
  const [ticketCategory, setTicketCategory] = useState("General");
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketMessage, setTicketMessage] = useState("");
  const [chatQueue, setChatQueue] = useState("General");
  const [openingMessage, setOpeningMessage] = useState("");
  const [chatStarted, setChatStarted] = useState(false);
  const [chatReply, setChatReply] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const normalizedSearch = search.trim().toLowerCase();

  const filteredTickets = useMemo(() => {
    if (!normalizedSearch) return tickets;

    return tickets.filter((ticket) => {
      const searchableText = [
        ticket.subject,
        ticket.category,
        ticket.status,
        ticket.reference,
        ticket.opened,
        ticket.updated,
        ...ticket.replies.map(
          (reply) => `${reply.author} ${reply.message} ${reply.time}`,
        ),
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(normalizedSearch);
    });
  }, [tickets, normalizedSearch]);

  const selectedTicket =
    filteredTickets.find((ticket) => ticket.id === selectedTicketId) ??
    filteredTickets[0] ??
    null;

  const openTicketCount = tickets.filter(
    (ticket) => ticket.status !== "Resolved",
  ).length;

  const handleStartChat = (event) => {
    event.preventDefault();
    if (!openingMessage.trim()) return;

    setChatMessages([
      {
        id: Date.now(),
        message: openingMessage.trim(),
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);

    setChatStarted(true);
  };

  const handleSendChat = (event) => {
    event.preventDefault();
    if (!chatReply.trim()) return;

    setChatMessages((current) => [
      ...current,
      {
        id: Date.now(),
        message: chatReply.trim(),
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);

    setChatReply("");
  };

  return (
    <main className="support-page">
      {/* Page heading */}
      <section className="support-heading">
        <p className="support-eyebrow">{t("support")}</p>
        <h1>{t("help_and_announcements")}</h1>
        <p>{t("support_page_description")}</p>
      </section>

      {/* Support statistics */}
      <section className="support-stats" aria-label={t("support_summary")}>
        <div className="support-stat">
          <strong>{openTicketCount}</strong>
          <span>{t("open_tickets_count", { count: openTicketCount })}</span>
        </div>

        <div className="support-stat">
          <strong>{announcements.length}</strong>
          <span>{t("announcements")}</span>
        </div>

        <div className="support-stat">
          <span className="support-online-dot" />
          <strong className="support-online-text">{t("online")}</strong>
          <span>{t("live_chat")}</span>
        </div>
      </section>

      <div className="support-divider" />

      {/* Ticket inbox and conversation */}
      <section className="support-ticket-panel">
        <aside className="support-inbox">
          <div className="support-inbox-heading">
            <p className="support-eyebrow">{t("inbox")}</p>

            <label htmlFor="ticket-search">
              {t("search_tickets").toUpperCase()}
            </label>

            <div className="support-search">
              <Search size={17} aria-hidden="true" />

              <input
                id="ticket-search"
                type="search"
                placeholder={t("search_tickets_placeholder")}
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                aria-label={t("search_tickets_aria")}
              />

              {search && (
                <button
                  type="button"
                  aria-label={t("clear_ticket_search")}
                  onClick={() => setSearch("")}
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          <div className="support-ticket-list">
            {filteredTickets.length > 0 ? (
              filteredTickets.map((ticket) => (
                <button
                  type="button"
                  key={ticket.id}
                  className={`support-ticket-item ${
                    selectedTicket?.id === ticket.id ? "active" : ""
                  }`}
                  onClick={() => setSelectedTicketId(ticket.id)}
                >
                  <h3>
                    {t(
                      supportTextKeys.subjects[ticket.subject] ||
                        ticket.subject,
                    )}
                  </h3>

                  <p>
                    {t(categoryKeys[ticket.category] || ticket.category)} ·{" "}
                    {ticket.opened}
                  </p>

                  <StatusBadge status={ticket.status} t={t} />
                </button>
              ))
            ) : (
              <div className="support-empty">
                <Ticket size={25} />
                <p>{t("no_tickets_found")}</p>
                <span>{t("try_another_ticket_search")}</span>
              </div>
            )}
          </div>
        </aside>

        <div className="support-ticket-details">
          {selectedTicket ? (
            <>
              <div className="support-detail-header">
                <p className="support-eyebrow">
                  {t(
                    categoryKeys[selectedTicket.category] ||
                      selectedTicket.category,
                  ).toUpperCase()}
                </p>

                <h2>
                  {t(
                    supportTextKeys.subjects[selectedTicket.subject] ||
                      selectedTicket.subject,
                  )}
                </h2>

                <StatusBadge status={selectedTicket.status} t={t} />
              </div>

              <div className="support-ticket-meta">
                <div>
                  <span>{t("opened").toUpperCase()}</span>
                  <strong>{selectedTicket.opened}</strong>
                </div>

                <div>
                  <span>{t("updated").toUpperCase()}</span>
                  <strong>{selectedTicket.updated}</strong>
                </div>

                <div>
                  <span>{t("reference").toUpperCase()}</span>
                  <strong>{selectedTicket.reference}</strong>
                </div>
              </div>

              <div className="support-conversation">
                {selectedTicket.replies.map((reply, index) => (
                  <article
                    key={`${selectedTicket.id}-${index}`}
                    className={`support-message ${
                      reply.type === "user" ? "user-message" : "broker-message"
                    }`}
                  >
                    <span className="support-message-author">
                      {t(
                        authorKeys[reply.author] || reply.author,
                      ).toUpperCase()}
                    </span>

                    <p>
                      {t(
                        supportTextKeys.messages[reply.message] ||
                          reply.message,
                      )}
                    </p>

                    <time>{reply.time}</time>
                  </article>
                ))}
              </div>
            </>
          ) : (
            <div className="support-no-selection">
              <Ticket size={32} />
              <h3>{t("no_matching_ticket_selected")}</h3>
              <p>{t("clear_search_or_try_different_term")}</p>
            </div>
          )}
        </div>

        {/* New ticket accordion */}
        <section className="support-new-ticket">
          <button
            type="button"
            className="support-section-toggle support-new-ticket-toggle"
            onClick={() => setShowNewTicket((value) => !value)}
            aria-expanded={showNewTicket}
          >
            <span className="support-toggle-label">
              <span className="support-plus">+</span>
              {t("new_ticket")}
            </span>

            {showNewTicket ? (
              <X size={16} />
            ) : (
              <span className="support-plus">+</span>
            )}
          </button>

          {showNewTicket && (
            <form
              className="support-new-ticket-form"
              onSubmit={(event) => event.preventDefault()}
            >
              <div className="support-form-grid">
                <div className="support-form-group">
                  <label htmlFor="ticket-category">
                    {t("category").toUpperCase()}
                  </label>

                  <select
                    id="ticket-category"
                    value={ticketCategory}
                    onChange={(event) => setTicketCategory(event.target.value)}
                  >
                    <option value="General">{t("general")}</option>
                    <option value="Funding">{t("funding")}</option>
                    <option value="Verification">{t("verification")}</option>
                    <option value="Platform">{t("platform")}</option>
                  </select>
                </div>

                <div className="support-form-group">
                  <label htmlFor="ticket-subject">
                    {t("subject").toUpperCase()}
                  </label>

                  <input
                    id="ticket-subject"
                    type="text"
                    placeholder={t("enter_ticket_subject")}
                    value={ticketSubject}
                    onChange={(event) => setTicketSubject(event.target.value)}
                  />
                </div>
              </div>

              <div className="support-form-group">
                <label htmlFor="ticket-message">
                  {t("message").toUpperCase()}
                </label>

                <textarea
                  id="ticket-message"
                  rows={5}
                  placeholder={t("describe_your_issue")}
                  value={ticketMessage}
                  onChange={(event) => setTicketMessage(event.target.value)}
                />
              </div>

              {/* Intentionally disabled in the original design */}
              <button
                type="button"
                className="support-create-ticket-button"
                disabled
                aria-disabled="true"
              >
                {t("create_ticket")}
              </button>

              <p className="support-form-help">{t("ticket_form_help")}</p>
            </form>
          )}
        </section>
      </section>

      {/* Live chat accordion */}
      <section className="support-live-chat">
        <button
          type="button"
          className="support-section-toggle support-live-chat-toggle"
          onClick={() => setShowLiveChat((value) => !value)}
          aria-expanded={showLiveChat}
        >
          <span className="support-live-chat-title">
            <MessageCircle size={17} />
            {t("live_chat")}
          </span>

          <span className="support-live-chat-toggle-right">
            <span className="support-chat-online-badge">{t("online")}</span>

            {showLiveChat ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </span>
        </button>

        {showLiveChat && (
          <div className="support-chat-layout">
            <section className="support-chat-start">
              {!chatStarted ? (
                <>
                  <div className="support-chat-start-heading">
                    <div>
                      <p className="support-eyebrow">
                        {t("live_chat").toUpperCase()}
                      </p>
                      <h2>{t("talk_to_support")}</h2>
                    </div>

                    <span className="support-agents-online">
                      {t("agents_online")}
                    </span>
                  </div>

                  <p className="support-chat-description">
                    {t("agents_online_start_chat")}
                  </p>

                  <form
                    className="support-chat-start-form"
                    onSubmit={handleStartChat}
                  >
                    <div className="support-form-group">
                      <label htmlFor="chat-queue">
                        {t("queue").toUpperCase()}
                      </label>

                      <select
                        id="chat-queue"
                        value={chatQueue}
                        onChange={(event) => setChatQueue(event.target.value)}
                      >
                        <option value="General">{t("general")}</option>
                        <option value="Funding">{t("funding")}</option>
                        <option value="Platform / MT5">
                          {t("platform_mt5")}
                        </option>
                      </select>
                    </div>

                    <div className="support-form-group">
                      <label htmlFor="opening-message">
                        {t("opening_message").toUpperCase()}
                      </label>

                      <textarea
                        id="opening-message"
                        rows={3}
                        placeholder={t("describe_help_needed")}
                        value={openingMessage}
                        onChange={(event) =>
                          setOpeningMessage(event.target.value)
                        }
                      />
                    </div>

                    <button
                      type="submit"
                      className="support-start-chat-button"
                      disabled={!openingMessage.trim()}
                    >
                      {t("start_live_chat")}
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <div className="support-chat-start-heading">
                    <div>
                      <p className="support-eyebrow">
                        {t("live_chat").toUpperCase()} ·{" "}
                        {t(categoryKeys[chatQueue] || chatQueue).toUpperCase()}
                      </p>

                      <h2>{t("broker_support")}</h2>
                    </div>

                    <span className="support-agents-online">
                      {t("agents_online")}
                    </span>
                  </div>

                  <div className="support-chat-transcript" aria-live="polite">
                    <div className="support-chat-welcome">
                      {t("chat_welcome")}
                    </div>

                    {chatMessages.map((message) => (
                      <div
                        className="support-chat-user-message"
                        key={message.id}
                      >
                        <p>{message.message}</p>
                        <time>{message.time}</time>
                      </div>
                    ))}
                  </div>

                  <form
                    className="support-chat-reply-form"
                    onSubmit={handleSendChat}
                  >
                    <input
                      type="text"
                      placeholder={t("type_your_message")}
                      value={chatReply}
                      onChange={(event) => setChatReply(event.target.value)}
                    />

                    <button
                      type="submit"
                      aria-label={t("send_chat_message")}
                      disabled={!chatReply.trim()}
                    >
                      <Send size={17} />
                    </button>
                  </form>
                </>
              )}
            </section>

            <aside className="support-chat-guidance">
              <h3>{t("before_you_start")}</h3>

              <div className="support-guidance-item">
                <span>1</span>
                <div>
                  <strong>{t("pick_queue_that_fits")}</strong>
                  <p>{t("support_queue_options")}</p>
                </div>
              </div>

              <div className="support-guidance-item">
                <span>2</span>
                <div>
                  <strong>{t("never_send_passwords_or_card_numbers")}</strong>
                  <p>{t("support_security_notice")}</p>
                </div>
              </div>
            </aside>
          </div>
        )}
      </section>

      {/* Announcements */}
      <section className="support-announcements">
        <div className="support-announcements-heading">
          <p className="support-eyebrow">{t("notices")}</p>
          <h2>{t("announcements")}</h2>
        </div>

        <div className="support-announcement-list">
          {announcements.map((announcement) => (
            <article className="support-announcement" key={announcement.id}>
              <div className="support-announcement-content">
                <h3>
                  {t(
                    supportTextKeys.announcements[announcement.title] ||
                      announcement.title,
                  )}
                </h3>

                <p>
                  {t(
                    supportTextKeys.announcements[announcement.description] ||
                      announcement.description,
                  )}
                </p>

                <time>{announcement.date}</time>
              </div>

              <span
                className={`support-announcement-status ${
                  announcement.status === "Action Required"
                    ? "announcement-action"
                    : ""
                }`}
              >
                {t(
                  announcementStatusKeys[announcement.status] ||
                    announcement.status,
                )}
              </span>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
