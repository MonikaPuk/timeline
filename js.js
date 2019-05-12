// window.addEventListener('resize', calculateSizes);
window.addEventListener('DOMContentLoaded', loadSVG)
// window.addEventListener('DOMContentLoaded', fetchJSON)

function fetchJSON(){
    fetch('data.json')
    .then(res => res.json())
    .then(dataJSON =>{
         dataJSON.forEach((obj, i) => {
        // console.log(document.querySelector(`#vinyl-${i++}`));
        const template = document.querySelector('#albums_template').content;
        const tmplCopy = template.cloneNode(true);
        tmplCopy.querySelector('#album_title').innerHTML = 'Title: ' + obj.title;
        tmplCopy.querySelector('#date').innerHTML = 'Release year: ' + obj.released;
        tmplCopy.querySelector('#record').innerHTML = 'Most famous record: ' + obj.sample_title;
        tmplCopy.querySelector('#peak_uk').innerHTML = 'Peak chart UK position: ' + obj.UK;
        tmplCopy.querySelector('#peak_us').innerHTML = 'Peak chart UK position: ' + obj.US;
        tmplCopy.querySelector('#photo').src = obj.photo;
        document.querySelector(`[data-id='${obj.id}']`).appendChild(tmplCopy);
    })
})

}
function loadSVG(){
    fetch('timeline.svg')
    .then(response => response.text() )
    .then(svgdata => {
        document.querySelector('#svg_timeline').insertAdjacentHTML('afterbegin', svgdata);
        fetchJSON();
        calculateSizes();
        hover();
    })
    
}

function calculateSizes() {

    let allDivs = document.querySelectorAll('#svg_timeline div');
    let allAlbums = document.querySelectorAll('#albums g');
    allAlbums.forEach((album, i) => {
        fitRectangle("#" + album.getAttribute('id') + " .rectangle", '#' + allDivs[i].getAttribute('id'));
    });
}

function fitRectangle( svgElement, htmlElement){
    svgElement = document.querySelector(svgElement); 
    htmlElement = document.querySelector(htmlElement);
    
    const rect = svgElement.getBoundingClientRect();
    htmlElement.style.left = rect.x + 'px';
    htmlElement.style.top = rect.y + 'px';
    htmlElement.style.width = rect.width + 'px'
    htmlElement.style.height = rect.height + 'px';
    // document.querySelector('.rectangle').style.height = '300px';

    // console.log(document.querySelector('.album').clientHeight)
}

function hover(){

const allVinyls = document.querySelectorAll(`[data-name="vinyl"]`);
const allInside = document.querySelectorAll('.album');
const allRect = document.querySelectorAll(".rectangle")
allVinyls.forEach((vinyl, i) => {
    
    vinyl.addEventListener('mouseover', () =>{
        allRect[i].style.opacity = '1';
        allInside[i].style.opacity = '1';
    })
    vinyl.addEventListener('mouseout', () =>{
        allRect[i].style.opacity = '0';
        allInside[i].style.opacity = '0';
    })
allInside.forEach((inside, i) =>{
    inside.addEventListener('mouseover', () =>{
        allRect[i].style.opacity = '1';
        allInside[i].style.opacity = '1';
    })
    inside.addEventListener('mouseout', () =>{
        allRect[i].style.opacity = '0';
        allInside[i].style.opacity = '0';
 })
})
})
}