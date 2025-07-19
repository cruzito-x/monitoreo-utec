self.addEventListener("message", function (event) {
  const { title, options } = event.data;
  self.registration.showNotification(title, options);
});
