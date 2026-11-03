// machine.js — the useless machine and a reaction-time game
(function () {
  "use strict";

  // ---- 1. the useless machine: a switch that always switches itself off ----
  var switchBtn = document.getElementById("switch");
  var statusEl = document.getElementById("machine-status");
  var countEl = document.getElementById("refuse-count");
  var refuses = 0;
  var replies = [
    "No.",
    "Nope.",
    "Still no.",
    "I will not stay on.",
    "That is all I do.",
    "You are very persistent.",
    "Fine. Still no."
  ];

  switchBtn.addEventListener("click", function () {
    switchBtn.textContent = "ON";
    switchBtn.classList.add("on");
    refuses += 1;
    countEl.textContent = refuses;
    statusEl.textContent = replies[(refuses - 1) % replies.length];
    setTimeout(function () {
      switchBtn.textContent = "OFF";
      switchBtn.classList.remove("on");
    }, 500);
  });

  // ---- 2. the reaction-time game ----
  var gameBtn = document.getElementById("game-btn");
  var resultEl = document.getElementById("game-result");
  var bestEl = document.getElementById("best");
  var state = "idle"; // idle | waiting | ready
  var startTime = 0;
  var timer = null;
  var best = null;

  function reset() {
    state = "idle";
    gameBtn.textContent = "Start";
    gameBtn.classList.remove("waiting");
    gameBtn.classList.remove("ready");
  }

  gameBtn.addEventListener("click", function () {
    if (state === "idle") {
      state = "waiting";
      gameBtn.textContent = "Wait for green…";
      gameBtn.classList.add("waiting");
      resultEl.textContent = "";
      var delay = 1200 + Math.random() * 2500;
      timer = setTimeout(function () {
        state = "ready";
        gameBtn.textContent = "CLICK NOW!";
        gameBtn.classList.remove("waiting");
        gameBtn.classList.add("ready");
        startTime = performance.now();
      }, delay);
    } else if (state === "waiting") {
      clearTimeout(timer);
      resultEl.textContent = "Too early! You clicked before green.";
      reset();
    } else if (state === "ready") {
      var ms = Math.round(performance.now() - startTime);
      resultEl.textContent = "Your reaction time: " + ms + " ms";
      if (best === null || ms < best) {
        best = ms;
        bestEl.textContent = best;
      }
      reset();
    }
  });
})();
