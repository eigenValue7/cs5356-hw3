const query = "cat";
const url = `https://collectionapi.metmuseum.org/public/collection/v1/search?medium=Paintings&hasImages=true&q=${encodeURIComponent(query)}`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    const object_ids = data.objectIDs.slice(0,30);
    console.log(object_ids);

    object_ids.forEach(element => {
        fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${element}`)
        .then(response => response.json())
        .then(data => {
            if (data.primaryImage){

            const img = document.createElement('img');
            img.src = data.primaryImage;
            img.alt = data.title || "Met Museum Image";
            console.log(data.title)
            document.getElementById('arts').appendChild(img);
            } else {
                console.log("no image")
            }
        }).catch(error => {
            console.error("Error fetching object data:", error);
        });
        
    });
  })
  .catch(error => {
    console.error("Error fetching data:", error);
  });
