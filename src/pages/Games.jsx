import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  RefreshCw,
  Pencil,
  X,
  Check,
  ChevronDown,
} from "lucide-react";
import "../styles/Games.css";

const initialGames = [
  {
    id: 1,
    symbol: "EURUSD",
    type: "MARKET PREDICTOR",
    level: "BASIC",
    title: "Market predictor",
    question: "Where will EUR/USD finish today?",
    description: "Choose a direction before the prediction window closes.",
    reward: 120,
    xp: 50,
    opened: "5 Nov, 00:00",
    closes: "6 Nov, 00:00",
    result: "6 Nov, 12:00",
    status: "ENTERED",
    options: ["Higher", "Lower", "Unchanged"],
    selected: "Higher",
    locked: true,
    split: true,
  },
  {
    id: 2,
    symbol: "XAUUSD",
    type: "BULL VS BEAR",
    level: "BASIC",
    title: "Bull vs Bear",
    question: "What is the next directional move for gold?",
    description:
      "Make one time-boxed prediction. Trading activity is never required.",
    reward: 120,
    xp: 50,
    opened: "5 Nov, 00:00",
    closes: "6 Nov, 00:00",
    result: "6 Nov, 12:00",
    status: "OPEN",
    options: ["Bull", "Bear"],
    selected: null,
    locked: false,
    split: false,
  },
  {
    id: 3,
    symbol: "EVENT",
    type: "CALENDAR CHALLENGE",
    level: "BASIC",
    title: "Calendar challenge",
    question: "Which event has the strongest scheduled market impact?",
    description: "Use the broker education calendar and select one event.",
    reward: 120,
    xp: 50,
    opened: "5 Nov, 00:00",
    closes: "6 Nov, 00:00",
    result: "6 Nov, 12:00",
    status: "OPEN",
    options: ["US CPI", "UK retail sales", "EU sentiment survey"],
    selected: null,
    locked: false,
    split: false,
  },
  {
    id: 4,
    symbol: "EURUSD",
    type: "PRICE TARGET",
    level: "ADVANCED",
    title: "Price target",
    question: "Set Friday’s EUR/USD closing target.",
    description:
      "Closest eligible forecast within the broker tolerance scores.",
    reward: 180,
    xp: 80,
    opened: "5 Nov, 00:00",
    closes: "6 Nov, 00:00",
    result: "6 Nov, 12:00",
    status: "OPEN",
    options: [],
    selected: null,
    locked: false,
    split: false,
  },
];

const leaderboardData = {
  Daily: [
    { name: "AtlasWave", score: "820", correct: "9 of 12 correct · 1,240 XP" },
    {
      name: "MintFalcon",
      score: "760",
      correct: "8 of 11 correct · 1,100 XP",
      you: true,
    },
    { name: "GulfSignal", score: "690", correct: "7 of 10 correct · 980 XP" },
    { name: "CedarChart", score: "610", correct: "7 of 11 correct · 910 XP" },
  ],
  Weekly: [
    {
      name: "AtlasWave",
      score: "2,820",
      correct: "29 of 35 correct · 3,240 XP",
    },
    {
      name: "MintFalcon",
      score: "2,460",
      correct: "25 of 31 correct · 2,900 XP",
      you: true,
    },
    {
      name: "GulfSignal",
      score: "2,190",
      correct: "22 of 30 correct · 2,480 XP",
    },
    {
      name: "CedarChart",
      score: "1,910",
      correct: "20 of 28 correct · 2,110 XP",
    },
  ],
  Monthly: [
    {
      name: "AtlasWave",
      score: "8,820",
      correct: "89 of 105 correct · 9,240 XP",
    },
    {
      name: "MintFalcon",
      score: "7,460",
      correct: "75 of 91 correct · 8,100 XP",
      you: true,
    },
    {
      name: "GulfSignal",
      score: "6,190",
      correct: "62 of 80 correct · 7,480 XP",
    },
    {
      name: "CedarChart",
      score: "5,910",
      correct: "60 of 78 correct · 6,910 XP",
    },
  ],
};

const gameTranslationKeys = {
  "MARKET PREDICTOR": "market_predictor_type",
  "BULL VS BEAR": "bull_vs_bear_type",
  "CALENDAR CHALLENGE": "calendar_challenge_type",
  "PRICE TARGET": "price_target_type",
  BASIC: "basic",
  ADVANCED: "advanced",
  "Market predictor": "market_predictor",
  "Where will EUR/USD finish today?": "eurusd_finish_question",
  "Choose a direction before the prediction window closes.":
    "choose_direction_description",
  "Bull vs Bear": "bull_vs_bear",
  "What is the next directional move for gold?": "gold_direction_question",
  "Make one time-boxed prediction. Trading activity is never required.":
    "time_boxed_prediction_description",
  "Calendar challenge": "calendar_challenge",
  "Which event has the strongest scheduled market impact?":
    "strongest_market_impact_question",
  "Use the broker education calendar and select one event.":
    "broker_calendar_description",
  "Price target": "price_target",
  "Set Friday’s EUR/USD closing target.": "friday_eurusd_target_question",
  "Closest eligible forecast within the broker tolerance scores.":
    "closest_forecast_description",
  Higher: "higher",
  Lower: "lower",
  Unchanged: "unchanged",
  Bull: "bull",
  Bear: "bear",
  "US CPI": "us_cpi",
  "UK retail sales": "uk_retail_sales",
  "EU sentiment survey": "eu_sentiment_survey",
  ENTERED: "entered",
  OPEN: "open",
};

function translated(t, value) {
  return t(gameTranslationKeys[value] || value);
}

function GameOptions({ game, onSelect }) {
  const { t } = useTranslation();
  if (game.id === 4) {
    return (
      <div className="price-target">
        <label htmlFor="price-target">{t("your_closing_target")}</label>
        <input
          id="price-target"
          type="text"
          placeholder="1.0500 – 1.2500"
          disabled={game.locked}
        />
        <small>{t("scores_within_tolerance")}</small>
      </div>
    );
  }

  const icons = {
    Higher: <ArrowUpRight />,
    Lower: <ArrowDownRight />,
    Unchanged: <Minus />,
    Bull: <Minus />,
    Bear: <Minus />,
    "US CPI": <Minus />,
    "UK retail sales": <Minus />,
    "EU sentiment survey": <Minus />,
  };

  return (
    <div
      className={`game-options ${game.options.length === 2 ? "two-options" : ""}`}
    >
      {game.options.map((option) => (
        <button
          type="button"
          key={option}
          disabled={game.locked}
          className={`game-option ${
            game.selected === option ? "selected" : ""
          } ${game.locked ? "is-locked" : ""}`}
          onClick={() => onSelect(option)}
        >
          <span className="option-icon">{icons[option]}</span>
          <span>{translated(t, option)}</span>
        </button>
      ))}
    </div>
  );
}

function PredictionArena({ game, onSelect, onLock }) {
  const { t } = useTranslation();
  const [priceTarget, setPriceTarget] = useState("");

  return (
    <section className="prediction-arena">
      <div className="arena-main">
        <div className="arena-tags">
          <span className="tag symbol-tag">{game.symbol}</span>
          <span className="tag type-tag">{translated(t, game.type)}</span>
          <span className="tag level-tag">{translated(t, game.level)}</span>
          {game.status === "ENTERED" && (
            <span className="tag entered-tag">{t("entered")}</span>
          )}
        </div>

        <h2>{translated(t, game.title)}</h2>
        <p className="arena-question">{translated(t, game.question)}</p>
        <p className="arena-description">{translated(t, game.description)}</p>

        {game.id === 4 ? (
          <div className="price-target">
            <label htmlFor="arena-price">{t("your_closing_target")}</label>
            <input
              id="arena-price"
              type="number"
              placeholder="1.0500 – 1.2500"
              value={priceTarget}
              onChange={(e) => setPriceTarget(e.target.value)}
              disabled={game.locked}
            />
            <small>{t("scores_within_tolerance")}</small>
          </div>
        ) : (
          <GameOptions game={game} onSelect={onSelect} />
        )}

        <div className="arena-reward">
          <div>
            <strong className="reward-value">◆ {game.reward}</strong>
            <p>
              +{game.xp} XP {t("if_correct")}
            </p>
            <p className="lock-note">
              {game.locked
                ? t("locked_one_entry")
                : t("one_entry_cannot_change")}
            </p>
          </div>

          <button
            type="button"
            className={`lock-button ${game.locked ? "locked" : ""}`}
            onClick={() => onLock(priceTarget)}
            disabled={game.locked}
          >
            {game.locked ? t("prediction_locked") : t("lock_in_prediction")}
          </button>
        </div>
      </div>

      <div className="arena-details">
        <div className="timeline">
          <div className="timeline-item completed">
            <span className="timeline-dot" />
            <div>
              <small>{t("opened")}</small>
              <strong>{game.opened}</strong>
            </div>
          </div>

          <div className="timeline-item active">
            <span className="timeline-dot" />
            <div>
              <small>{t("entries_close")}</small>
              <strong>{game.closes}</strong>
              <span className="countdown">
                {t("countdown_remaining", { time: "5h 40m" })}
              </span>
            </div>
          </div>

          <div className="timeline-item">
            <span className="timeline-dot" />
            <div>
              <small>{t("result_published")}</small>
              <strong>{game.result}</strong>
            </div>
          </div>
        </div>

        <div className="community">
          <div className="community-heading">
            <strong>{t("community_split")}</strong>
            {game.split ? (
              <button type="button" onClick={() => {}}>
                {t("refresh")}
              </button>
            ) : (
              <span>{t("hidden")}</span>
            )}
          </div>

          {game.split ? (
            <>
              <div className="split-bar">
                <span className="split-higher" />
                <span className="split-lower" />
                <span className="split-unchanged" />
              </div>

              <div className="split-labels">
                <div>
                  {t("higher")}
                  <strong>52%</strong>
                </div>
                <div>
                  {t("lower")}
                  <strong>31%</strong>
                </div>
                <div>
                  {t("unchanged")}
                  <strong>17%</strong>
                </div>
              </div>

              <p>{t("entries_counted", { count: 100 })}</p>
            </>
          ) : (
            <p className="hidden-split">{t("split_hidden_until_locked")}</p>
          )}
        </div>
      </div>
    </section>
  );
}

function translateLeaderboardStats(t, value) {
  const match = value.match(/^(\\d+) of (\\d+) correct · ([\\d,]+) XP$/);
  if (!match) return value;
  return t("leaderboard_correct_stats", {
    correct: match[1],
    total: match[2],
    xp: match[3],
  });
}

function Leaderboard() {
  const { t } = useTranslation();
  const [period, setPeriod] = useState("Daily");

  return (
    <aside className="leaderboard">
      <div className="leaderboard-heading">
        <div>
          <h2>{t("leaderboard")}</h2>
          <p>{t("pseudonymous_ranking")}</p>
        </div>

        <button
          type="button"
          className="refresh-button"
          onClick={() => {}}
          aria-label={t("refresh_leaderboard")}
        >
          <RefreshCw size={17} />
        </button>
      </div>

      <div className="leaderboard-tabs">
        {["Daily", "Weekly", "Monthly"].map((tab) => (
          <button
            type="button"
            key={tab}
            onClick={() => setPeriod(tab)}
            className={period === tab ? "active" : ""}
          >
            {t(tab.toLowerCase())}
          </button>
        ))}
      </div>

      <p className="leaderboard-date">{t("leaderboard_date")}</p>

      <div className="leaderboard-list">
        {leaderboardData[period].map((person, index) => (
          <div
            className={`leaderboard-user ${person.you ? "current-user" : ""}`}
            key={person.name}
          >
            <span className={`rank rank-${index + 1}`}>{index + 1}</span>

            <div className="user-info">
              <strong>
                {person.name}
                {person.you && <span className="you-tag">{t("you")}</span>}
              </strong>
              <small>{translateLeaderboardStats(t, person.correct)}</small>
            </div>

            <strong className="leaderboard-score">◆ {person.score}</strong>
          </div>
        ))}
      </div>

      <p className="leaderboard-note">{t("leaderboard_privacy_note")}</p>
    </aside>
  );
}

function AlsoOpen({ games, activeGame, onChange }) {
  const { t } = useTranslation();
  return (
    <section className="also-open">
      <div className="also-open-heading">
        <div>
          <span>{t("also_open")}</span>
          <h2>{t("more_matches", { count: games.length })}</h2>
        </div>
        <p>{t("select_match_instruction")}</p>
      </div>

      <div className="match-grid">
        {games.map((game) => (
          <button
            type="button"
            key={game.id}
            className={`match-card ${
              activeGame.id === game.id ? "match-active" : ""
            }`}
            onClick={() => onChange(game)}
          >
            <div className="match-tags">
              <span className="tag symbol-tag">{game.symbol}</span>
              <span className="tag level-tag">{translated(t, game.level)}</span>
              {game.status === "ENTERED" && (
                <span className="tag entered-tag">{t("entered")}</span>
              )}
            </div>

            <h3>{translated(t, game.title)}</h3>
            <p>{translated(t, game.question)}</p>

            <div className="match-footer">
              <div>
                <strong>◆ {game.reward}</strong>
                <span>+{game.xp} XP</span>
              </div>
              <span>{t("closes_at", { date: game.closes })}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="also-open-disclaimer">
        {t("games_educational_disclaimer")}
      </div>
    </section>
  );
}

export default function Games() {
  const { t } = useTranslation();
  const [games, setGames] = useState(initialGames);
  const [activeGame, setActiveGame] = useState(initialGames[0]);
  const [period, setPeriod] = useState("Daily");
  const [username, setUsername] = useState("MintFalcon");
  const [editUsername, setEditUsername] = useState(false);

  const updateGame = (updated) => {
    setGames((previous) =>
      previous.map((game) => (game.id === updated.id ? updated : game)),
    );
    setActiveGame(updated);
  };

  const selectOption = (option) => {
    if (activeGame.locked) return;

    const updated = {
      ...activeGame,
      selected: option,
    };

    updateGame(updated);
  };

  const lockPrediction = (price) => {
    if (activeGame.locked) return;

    if (activeGame.id === 4 && !price) return;
    if (activeGame.id !== 4 && !activeGame.selected) return;

    const updated = {
      ...activeGame,
      locked: true,
      status: "ENTERED",
    };

    updateGame(updated);
  };

  const otherGames = games.filter((game) => game.id !== activeGame.id);

  return (
    <div className="games-page">
      <main className="games-container">
        <header className="games-heading">
          <span className="eyebrow">{t("games")}</span>
          <h1>{t("prediction_arena")}</h1>
          <p>{t("games_page_description")}</p>
        </header>

        <section className="player-summary">
          <div className="player-identity">
            <div className="player-avatar">
              {username.slice(0, 2).toUpperCase()}
            </div>

            <div className="player-details">
              {editUsername ? (
                <div className="username-edit">
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    aria-label={t("username")}
                  />

                  <button
                    type="button"
                    className="save-username"
                    onClick={() => {}}
                  >
                    Save
                  </button>

                  <button
                    type="button"
                    className="cancel-username"
                    onClick={() => setEditUsername(false)}
                    aria-label={t("cancel_editing")}
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="username-display">
                  <strong>{username}</strong>
                  <span className="player-rank">
                    {t("rank_number", { rank: 2 })}
                  </span>
                  <button
                    type="button"
                    className="change-username"
                    onClick={() => setEditUsername(true)}
                  >
                    Change
                  </button>
                </div>
              )}

              <small>{t("username_privacy_note")}</small>
            </div>
          </div>

          <div className="player-stats">
            <div>
              <span>{t("experience")}</span>
              <strong>1,100</strong>
              <small>{t("xp_earned")}</small>
            </div>
            <div>
              <span>{t("correct")}</span>
              <strong>8</strong>
              <small>{t("of_scored", { count: 11 })}</small>
            </div>
            <div>
              <span>{t("accuracy")}</span>
              <strong>73%</strong>
              <small>{t("lifetime")}</small>
            </div>
            <div>
              <span>{t("open_now")}</span>
              <strong>3</strong>
              <small>{t("matches_to_enter")}</small>
            </div>
          </div>
        </section>

        {/* Arena and sticky leaderboard only */}
        <div className="arena-layout">
          <PredictionArena
            game={activeGame}
            onSelect={selectOption}
            onLock={lockPrediction}
          />

          <Leaderboard />
        </div>

        {/* Full-width section OUTSIDE the two-column layout */}
        <AlsoOpen
          games={otherGames}
          activeGame={activeGame}
          onChange={setActiveGame}
        />
      </main>
    </div>
  );
}
