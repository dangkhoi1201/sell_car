let loadData = async () => {
  let result = await firebase.firestore().collection("car").get();

  let data = getDataFromDocs(result.docs);

  console.log(data);
  renderCar(data);
};

let renderCar = async (data) => {
  let dom = document.getElementById("carss");
  dom.innerHTML = "";
  for (let d of data) {
    let html = `<div class="col-lg-4">
        <div class="trainer-item">
          <div class="image-thumb">
            <img style="height: 180px;
            object-fit: contain;" src="${d.img}" alt="" />
          </div>
          <div class="down-content">
            <span>
              <del>${d.prePrice} VND </del> &nbsp; ${d.price} VND
            </span>

            <h4>${d.name}</h4>

            <p>
              <i class="fa fa-dashboard"></i> ${d.km} km &nbsp;&nbsp;&nbsp;
              <i class="fa fa-cube"></i> ${d.seat} &nbsp;&nbsp;&nbsp;
              <i class="fa fa-cog"></i> ${d.type}  &nbsp;&nbsp;&nbsp;
            </p>

            <ul class="social-icons">
              <li><a href="car-details.html">+ View Car</a></li>
            </ul>
          </div>
        </div>
      </div>`;
    dom.innerHTML += html;
  }
};

let getDataFromDoc = (doc) => {
  let data = doc.data();
  data.id = doc.id;
  return data;
};

let getDataFromDocs = (docs) => {
  let result = [];
  for (let doc of docs) {
    let data = getDataFromDoc(doc);
    result.push(data);
  }
  return result;
};

loadData();
