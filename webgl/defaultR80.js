/* Global */
var camera, scene, renderer;
var keyState = {};
var cubecubeMesh;

function setRenderer() {

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
}


function setCamera() {

	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
	
	camera.position.x = 5;
	camera.position.y = 5;
	camera.position.z = 5;
}


function setControls() {

	controls = new THREE.OrbitControls( camera );
	controls.damping = 0.2;
}


function setScene() {

	scene = new THREE.Scene();
}


function setWorld() {
	/* Inside this we put all the object of our scene */

	var geometry = new THREE.BoxGeometry( 1, 1, 1 );
	var material = new THREE.MeshPhongMaterial( { color: 0x0000ff, wireframe: false, shininess:50 } );
	cubeMesh = new THREE.Mesh( geometry, material );
	scene.add( cubeMesh );				
}


function setCameraHelper() {wd
	
	var helperCamera = new THREE.CameraHelper( camera );
	scene.add( helperCamera );
}


function setDrawHelpers( size ) {

	var axisHelper = new THREE.AxisHelper( size );
	scene.add( axisHelper );
}	


function animate() {

	requestAnimationFrame( animate );
	
	cubeMesh.rotation.x += 0.01;
	cubeMesh.rotation.y += 0.01;
	cubeMesh.rotation.z += 0.01;
	
	renderer.render( scene, camera );
}


function setEventListenerHandler(){
	
	window.addEventListener('keydown',function(e){
	    keyState[e.keyCode || e.which] = true;
	},true); 

	window.addEventListener('keyup',function(e){
	    keyState[e.keyCode || e.which] = false;
	},true);
	
	window.addEventListener( 'resize', onWindowResize, false );
}


function setKeyboardControls() {
    
    if( keyState[87] ){ // W
    	cubeMesh.position.y += 0.1;
    }

    if( keyState[83] ){ // S
        cubeMesh.position.y -= 0.1;
    }

    if( keyState[65] ){ // A
    	cubeMesh.position.x -= 0.1;
    }

    if( keyState[68] ){ // D
    	cubeMesh.position.x += 0.1;
    }

    setTimeout( setKeyboardControls, 10 );
}    

function setLights(){

	var light = new THREE.AmbientLight( 0xffffff );
	scene.add( light );

	var spotLight = new THREE.SpotLight( 0xffffff );
	spotLight.position.set( 0.5, 0.5, 0.5 );

	spotLight.castShadow = true;

	spotLight.shadow.mapSize.width = window.innerWidth;
	spotLight.shadow.mapSize.height = window.innerHeight;

	scene.add( spotLight );
}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}


function main() {

	setRenderer();
	setCamera();
	setControls();
	setEventListenerHandler();
	setKeyboardControls();
	setScene();
	setLights();
	//setCameraHelper()
	setDrawHelpers( 5 )
	setWorld();
	animate();
}
