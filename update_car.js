let form_update = document.querySelector("#form_update");

form_update.onsubmit = (e) => {
  e.preventDefault();

  let carName = form_update.name.value;
  let prePrice = form_update.prePrice.value;
  let price = form_update.price.value;
  let type = form_update.type.value;
  let seat = form_update.seat.value;
  let km = form_update.km.value;

  let photo = form_update.img.files[0];

  const ref = firebase.storage().ref();
  const metadata = {
    contentType: photo.type,
  };
  const name = photo.name;

  const Upload = ref.child(name).put(photo, metadata);
  Upload.then((snapshot) => snapshot.ref.getDownloadURL()).then((url) =>
    updateAccout(carName, prePrice, price, type, seat, km, url)
  );
};

let updateAccout = async (name, prePrice, price, type, seat, km, photo) => {
  let data = {
    name: name,
    prePrice: prePrice,
    price: price,
    type: type,
    seat: seat,
    km: km,
    img: photo,
  };
  await firebase.firestore().collection("car").add(data);
  sweetAlert("success", "Update success");
};

let sweetAlert = (icon, content) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: icon,
    title: content,
  });
};
