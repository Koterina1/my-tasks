importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyBKimXXoC99w_2b5rWLFPcsiKL5pm8fYhE",
  authDomain: "my-tasks-e4349.firebaseapp.com",
  projectId: "my-tasks-e4349",
  storageBucket: "my-tasks-e4349.firebasestorage.app",
  messagingSenderId: "798642364644",
  appId: "1:798642364644:web:a4a55c4a2e53289bbb4cf1"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Получено уведомление:", payload);

  const title = payload.notification?.title || "Мои задачи";
  const options = {
    body: payload.notification?.body || "У тебя есть задачи на сегодня",
    icon: "/icon-192.png"
  };

  self.registration.showNotification(title, options);
});
