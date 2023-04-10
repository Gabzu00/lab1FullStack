window.addEventListener("load", displayData)

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

    // insert the new row into the table body
    tableBody.appendChild(newRow);
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

  document.getElementById('showTitleSearch').innerHTML = (data)
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








