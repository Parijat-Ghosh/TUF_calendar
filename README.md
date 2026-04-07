# 📅 Interactive Wall Calendar Component

A polished, interactive, and responsive calendar component inspired by a physical wall calendar design. Built using React and Tailwind CSS, this project focuses on delivering a clean UI, smooth user experience, and efficient frontend architecture.

---

## 🚀 Live Demo


---

## 🎥 Demo Video

👉 (Add your Loom / YouTube link here)

---

## 🧠 Project Overview

This project was developed as part of a frontend engineering challenge. The goal was to transform a static wall calendar design into a fully functional and interactive web component.

The application allows users to:

* Select a range of dates
* Add and persist notes
* Interact with a responsive and visually appealing calendar UI

---

## ✨ Features

### 📆 Date Range Selection

* Select start and end dates
* Visual highlight for:

  * Start date
  * End date
  * Dates in between
* Dynamic range reset on new selection

### 📝 Notes System

* Add notes for selected date ranges
* Separate fields for:

  * Title
  * Content
* Notes are persisted using **localStorage**
* Previously saved notes auto-load on selecting the same date range

### 🎨 Wall Calendar UI

* Inspired by real-world wall calendars
* Includes:

  * Hero image section
  * Calendar grid
  * Notes panel
* Clean layout with proper visual hierarchy

### 📱 Fully Responsive Design

* Desktop: Structured layout (image + calendar + notes)
* Mobile: Stacked layout for better usability
* Optimized for touch interactions

### ✨ UI/UX Enhancements

* Smooth hover effects
* Interactive date selection feedback
* Clear visual states for user actions

---

## 🛠 Tech Stack

* **React (Vite)**
* **JavaScript / TypeScript**
* **Tailwind CSS**
* **Framer Motion** (for animations)
* **localStorage** (for persistence)

---

## 🧱 Project Structure

```id="3kq8pn"
/src
  /components
    CalendarGrid.tsx
    DayCell.tsx
    Header.tsx
    ImageSection.tsx
    NotesPanel.tsx
    NoteModal.tsx
  /assets
  App.tsx
  main.tsx
  utils.ts
  types.ts
```

---

## ⚙️ How It Works

### Date Range Logic

* First click → start date
* Second click → end date
* All dates between are automatically highlighted

### Notes Storage

* Notes are stored in browser using localStorage
* Data format:

```id="l1a3w2"
{
  "2026-01-05_to_2026-01-10": {
    "title": "Trip",
    "content": "Goa trip with friends"
  }
}
```

* Notes persist even after page refresh

---

## 🧪 Running Locally

```bash id="m91k2c"
git clone https://github.com/Parijat-Ghosh/TUF_calendar
cd TUF_calendar
npm install
npm run dev
```

---

## 🎯 Key Design Decisions

* Used **localStorage** instead of backend (as per requirements)
* Focused on **component modularity** for scalability
* Prioritized **UX and responsiveness**
* Avoided unnecessary complexity while maintaining clean architecture

---

## 📌 Future Improvements

* Add note indicators on calendar dates
* Theme switching (light/dark mode)
* Drag-to-select date range
* Holiday/event markers

---

## 🙌 Acknowledgment

This project was built as part of a frontend engineering task by takeUforward.

---

## 📬 Contact

* Name: Parijat Ghosh
* GitHub: https://github.com/Parijat-Ghosh

---

⭐ If you like this project, feel free to give it a star!
