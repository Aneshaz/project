let imgData = [{
        "title": "科比",
        "img": "http://img5.imgtn.bdimg.com/it/u=1034509453,3780254810&fm=26&gp=0.jpg"
    },
    {
        "title": "科比",
        "img": "http://img2.imgtn.bdimg.com/it/u=748498709,4262997883&fm=26&gp=0.jpg"
    },
    {
        "title": "科比",
        "img": "http://img0.imgtn.bdimg.com/it/u=519375851,3712964833&fm=26&gp=0.jpg"
    }, {
        "title": "科比",
        "img": "http://img0.imgtn.bdimg.com/it/u=2927006080,4133669820&fm=26&gp=0.jpg"
    },
    {
        "title": "科比",
        "img": "http://img2.imgtn.bdimg.com/it/u=1826053323,2657304213&fm=26&gp=0.jpg"
    },
    {
        "title": "科比",
        "img": "http://img4.imgtn.bdimg.com/it/u=2835727096,370852494&fm=26&gp=0.jpg"
    }, {
        "title": "科比",
        "img": "http://img1.imgtn.bdimg.com/it/u=2036438682,2597269289&fm=26&gp=0.jpg"
    },
    {
        "title": "科比",
        "img": "http://img3.imgtn.bdimg.com/it/u=2183114584,2344672575&fm=26&gp=0.jpg"
    },
    {
        "title": "科比",
        "img": "http://img0.imgtn.bdimg.com/it/u=2318116030,435769550&fm=26&gp=0.jpg"
    }
]
let loadImg = (src) => {
    return new Promise((resolve, reject) => {
        let image = new Image();
        image.onload = function() {
            resolve(image)
        };
        image.onerror = function() {
            reject('图片找不到')
        };
        image.src = src;
    })
}

render(imgData)

function render(data) {
    data.forEach(async(item) => {
        let img = await loadImg(item.img)
        document.body.appendChild(img)
    })
}