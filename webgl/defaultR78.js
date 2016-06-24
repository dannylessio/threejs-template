var camera, scene, renderer;
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
	var material = new THREE.MeshNormalMaterial( { wireframe: false } );
	cubeMesh = new THREE.Mesh( geometry, material );
	scene.add( cubeMesh );				
}


function setCameraHelper() {
	
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

	document.onkeydown = function( ev ){ keydown( ev ); };
	window.addEventListener( 'resize', onWindowResize, false );
}


function keydown( ev ){
	/* With this we can handle keyboard events 
	raised inside setEventListenerHandler() function */
	
	switch( ev.keyCode ){
	
		case 81: // Q
			cubeMesh.position.y += 0.1;
         	break;
        
        case 87: // W
           	cubeMesh.position.y -= 0.1;
			break;
    }
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
	setScene();
	//setCameraHelper()
	setDrawHelpers( 5 )
	setWorld();
	setEventListenerHandler();
	animate();
}
