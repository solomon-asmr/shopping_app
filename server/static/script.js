document.getElementById('productForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var productName = document.getElementById('productName').value;
    var description = document.getElementById('description').value;
    var price = document.getElementById('price').value;
    var image = document.getElementById('image').files[0];

    var formData = new FormData();
    formData.append('productName', productName);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('image', image);

    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            alert(data.message);
            document.getElementById('productForm').reset(); // Clear form values
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
