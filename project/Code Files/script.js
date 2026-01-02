let wallpapers = [                //object creation
    {id:1,name:"Mountain Sunrise",cat:"nature",img:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200",custom:false},
    {id:2,name:"Nebula Dreams",cat:"space",img:"https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1200",custom:false},
    {id:3,name:"Modern Lines",cat:"architecture",img:"https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=1200",custom:false},
    {id:4,name:"Color Splash",cat:"abstract",img:"https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=1200",custom:false},
    {id:5,name:"Forest Mist",cat:"nature",img:"https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200",custom:false}
];

let gallery = document.getElementById("gallery");     //accessing ID
let modal = document.getElementById("modal");
let modalImg = document.getElementById("modalImg");
let search = document.getElementById("search");


// showing existing wallpapers
function showWallpapers(list){
    gallery.innerHTML = "";
    list.forEach(w=>{
        gallery.innerHTML += `
            <div class="card">
                <img src="${w.img}">
                <div class="info">
                    <h3>${w.name}</h3>
                    <p>${w.cat}</p>
                    <div class="btn-box">
                        <button class="btn preview-btn" data-id="${w.id}">Preview</button>
                        <button class="btn download-btn" data-img="${w.img}" data-name="${w.name}">Download</button>
                        ${w.custom ? `<button class="btn delete-btn" data-id="${w.id}">Delete</button>` : ""}
                    </div>
                </div>
            </div>
        `;
    });
}
showWallpapers(wallpapers);

// CATEGORY FILTER
document.querySelectorAll(".cat-btn").forEach(btn=>{
    btn.onclick = ()=>{
        document.querySelectorAll(".cat-btn").forEach(b=>b.classList.remove("active"));
        btn.classList.add("active");
        let c = btn.dataset.cat;
        if(c==="all") showWallpapers(wallpapers);
        else showWallpapers(wallpapers.filter(x=>x.cat===c));
    };
});

// SEARCH
search.onkeyup = ()=>{
    let q = search.value.toLowerCase();
    showWallpapers(wallpapers.filter(x=>x.name.toLowerCase().includes(q)));
};

// PREVIEW + DELETE
document.body.addEventListener("click", e=>{
    if(e.target.classList.contains("preview-btn")){
        let id = e.target.dataset.id;
        let w = wallpapers.find(x=>x.id==id);
        modalImg.src = w.img;
        modal.classList.add("show");
    }
    if(e.target.classList.contains("delete-btn")){
        let id = e.target.dataset.id;
        wallpapers = wallpapers.filter(x=>x.id!=id);
        showWallpapers(wallpapers);
    }
});

// CLOSE PREVIEW
document.getElementById("closeModal").onclick = ()=>{
    modal.classList.remove("show");
};

// UPLOAD
document.getElementById("addBtn").onclick = ()=>{
    let name = document.getElementById("addName").value;
    let file = document.getElementById("addFile").files[0];

    if(!name || !file){
        alert("Please enter name and choose an image");
        return;
    }

    let reader = new FileReader();
    reader.onload = ()=>{
        wallpapers.push({
            id:Date.now(),
            name:name,
            cat:"custom",
            img:reader.result,
            custom:true
        });
        showWallpapers(wallpapers);
    };
    reader.readAsDataURL(file);
};

const feedbackForm = document.getElementById('feedback-form');
        const successMessage = document.getElementById('success-message');

        feedbackForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(feedbackForm);
            const feedback = {
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message'),
                timestamp: new Date().toISOString()
            };

            // Simulate submission (in real app, would send to server)
            console.log('Feedback submitted:', feedback);

            // Show success message
            successMessage.classList.add('show');
            feedbackForm.reset();

            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 5000);
        });

document.body.addEventListener("click", async (e) => {     //DOWNLOADING THE WALL PAPER
    if (e.target.classList.contains("download-btn")) {
        let imgURL = e.target.dataset.img;
        let fileName = e.target.dataset.name + ".jpg";

        try {
            let response = await fetch(imgURL);
            let blob = await response.blob();
            let url = URL.createObjectURL(blob);

            let a = document.createElement("a");
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
        } 
        catch (err) {
            console.error("Download failed:", err);
        }
    }
});

