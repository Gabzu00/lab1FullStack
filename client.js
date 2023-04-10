if (typeof window !== "undefined") {

  async function displayData() {

    const albums = await getData();

    console.log(albums)

    document.getElementById('albums').innerHTML = JSON.stringify(albums, null, 2)

  }

  window.addEventListener("load", displayData)

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

}


