window.addEventListener("load", displayData)
const addID = document.getElementById('addId');
const addTitle = document.getElementById('addTitle');
const addArtist = document.getElementById('addArtist');
const addYear = document.getElementById('addYear');



async function displayData() {

  const albums = await getData();

  console.log(albums)
  /* document.getElementById('showAlbums').innerHTML = JSON.stringify(albums, null, 2) */
  albums.forEach(element => {
    // get a reference to the table body element
    const tableBody = document.getElementById('showAlbums');

    // create a new table row element
    const newRow = document.createElement('tr');

    // create table cells and insert data into them
    const idCell = document.createElement('td');
    idCell.textContent = element._id;
    newRow.appendChild(idCell);

    const titleCell = document.createElement('td');
    titleCell.textContent = element.title;
    newRow.appendChild(titleCell);

    const artistCell = document.createElement('td');
    artistCell.textContent = element.artistName;
    newRow.appendChild(artistCell);

    const yearCell = document.createElement('td');
    yearCell.textContent = element.year;
    newRow.appendChild(yearCell);

    // create a new cell for the update button and input fields
    const buttonCell = document.createElement('td');

    // create update button element
    const updateButton = document.createElement('button');
    updateButton.textContent = 'Update';
    updateButton.id = `updateButton-${element._id}`;

    // create delete button element
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.id = `deleteButton-${element._id}`;

    const updateDiv = document.createElement('div');
    updateDiv.id = `updateDiv-${element._id}`;

    // append the button to the cell
    buttonCell.appendChild(updateButton);
    buttonCell.appendChild(deleteButton);
    buttonCell.appendChild(updateDiv);

    // append the cell to the row
    newRow.appendChild(buttonCell);

    // insert the new row into the table body
    tableBody.appendChild(newRow);

    updateButton.addEventListener('click', async () => {
      const updateDiv = document.querySelector(`#updateDiv-${element._id}`);
      updateDiv.innerHTML = /*html*/`
      <input type="text" id="getID" placeholder="ID" value="${element._id}" disabled>
      <input type="text" id="getTitle" placeholder="Title" value="${element.title}">
      <input type="text" id="getArtist" placeholder="Artist" value="${element.artistName}">
      <input type="text" id="getYear" placeholder="Year" value="${element.year}">
      <button id="commitButton-${element._id}">Commit</button>
    `;

      const commitButton = document.querySelector(`#commitButton-${element._id}`);
      commitButton.addEventListener('click', async () => {
        const getUpdateTitle = document.getElementById('getTitle')
        const getArtist = document.getElementById('getArtist')
        const getYear = document.getElementById('getYear')
        const title = getUpdateTitle.value
        const artist = getArtist.value
        const year = getYear.value

        const result = await updateData(element._id, title, artist, year)

        if (result === "Error ! This id was not found in the database") {
          document.getElementById('ErrorMessage').innerHTML = (result)
        }
        document.getElementById('showAlbums').innerHTML = ('')
        displayData()
      })
    })

    deleteButton.addEventListener('click', async () => {
      const updateDiv = document.querySelector(`#updateDiv-${element._id}`);
      updateDiv.innerHTML = /*html*/`
      <input type="text" id="getID" placeholder="ID" value="${element._id}" disabled>
      <button  id="confirmButton-${element._id}">Confirm</button>
      `;

      const confirmButton = document.querySelector(`#confirmButton-${element._id}`);
      confirmButton.addEventListener('click', async () => {

        const result = await deleteData(element._id)
        document.getElementById('ErrorMessage').innerHTML = (JSON.stringify(result))

        document.getElementById('showAlbums').innerHTML = ('')
        displayData()
      })

    })

  });
}

async function getData() {

  try {
    var result = await fetch('http://localhost:3000/api/albums', {
      method: 'GET',
      headers: { 'content-type': 'application/json' }
    })

    var rest = result.json();
    return (rest)
  } catch {

  }
}

searchButton.addEventListener('click', async () => {
  const searchTitle = document.getElementById('searchTitle');
  const searchTitleValue = searchTitle.value;
  console.log(searchTitleValue + " first")

  const data = await getTitle(searchTitleValue)

  console.log(data + " data from client!!!!")

  document.getElementById('showTitleSearch').innerHTML = (JSON.stringify(data))
})



async function getTitle(searchTitleValue) {

  try {
    var result = await fetch(`http://localhost:3000/api/albums/${searchTitleValue}`, {
      method: 'GET',
      headers: { 'content-type': 'application/json' }
    });

    var rest = result.json();
    return (rest)
  } catch {
    console.log("Something went wrong")
  }
}


addButton.addEventListener('click', async () => {

  const id = addID.value;
  const title = addTitle.value;
  const artist = addArtist.value;
  const year = addYear.value;

  const result = await addData(id, title, artist, year)
  console.log(result)
  if (result === "The id you entered already exist in the database") {
    document.getElementById('ErrorMessage').innerHTML = (JSON.stringify(result))
  } else {
    document.getElementById('ErrorMessage').innerHTML = (JSON.stringify("Album added"))
  }
  document.getElementById('showAlbums').innerHTML = ('')
  displayData();
})

async function addData(id, title, artist, year) {

  try {
    var result = await fetch('http://localhost:3000/api/albums', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ id: id, title: title, artist: artist, year: year })
    });

    var rest = result.json();
    return (rest)
  } catch {
    console.log("Something went wrong")
  }

}



async function updateData(id, title, artist, year) {
  try {
    var result = await fetch(`http://localhost:3000/api/albums/${id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ title: title, artist: artist, year: year })
    });

    var rest = result.json();
    return (rest)
  } catch {
    console.log("Something went wrong")
  }
}


async function deleteData(id) {
  try {
    var result = await fetch(`http://localhost:3000/api/albums/${id}`, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
    });

    var rest = result.json();
    return (rest)
  } catch {
    console.log("Something went wrong")
  }
}
