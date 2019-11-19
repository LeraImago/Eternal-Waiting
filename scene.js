window.onload = init();
function init() {
	let scene = new THREE.Scene();
	let renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
	let camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight, 
	0.1, 
	1000 );
	let controlsOrbit = new THREE.OrbitControls(camera, renderer.domElement);
	camera.position.set( -65, 35, 150 );
	controlsOrbit.update();

	let plane = new THREE.PlaneGeometry( 800, 800, 1, 1 );
	let planeMaterial = new THREE.MeshStandardMaterial({
	color: 0x1E1229,
	opacity: 0.7,
	transparent: true,
	side: THREE.DoubleSide});
	let ground = new THREE.Mesh(plane, planeMaterial);
	ground.position.set( 15, 20, -40);


	/*let axes = new THREE.AxesHelper(60);
	scene.add(axes);*/


	/*lights*/
	let ambientLight = new THREE.AmbientLight(0xffffff);

	let pointLight = new THREE.PointLight(0xFFFFE0);
	pointLight.position.set( 150, 50, 120 );
	/*var sphereSize = 1;
	var pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
	scene.add( pointLightHelper );*/

	let dirLight = new THREE.DirectionalLight( 0xffffff, 0.9);
	dirLight.castShadow = true;

	let width = 300;
	let height = 50;
	let intensity = 10;
	let areaLight1 = new THREE.RectAreaLight( 0x1388F8, intensity, width, height );
	areaLight1.position.set( 17, 20, 10 );

	/*fox*/
	function drawShape() {
		let shape = new THREE.Shape();
		shape.moveTo(10, 3);
		shape.lineTo(10, 49);
		shape.bezierCurveTo(15, 29, 25, 23, 30, 42);
		shape.splineThru(
			[new THREE.Vector2(30, 30),
			 new THREE.Vector2(26, 18),
			 new THREE.Vector2(29, 10),
		]);
		shape.quadraticCurveTo(20, 15, 12, 12);
		let hole1 = new THREE.Path();
		hole1.absellipse(16, 25, 2.7, 2, 0, 3, true);
		shape.holes.push(hole1);
		let hole2 = new THREE.Path();
		hole2.absellipse(24, 25, 2, 2, 0, 3, true);
		shape.holes.push(hole2);
		return shape;
	}
	let extrudeSettings = {
		steps: 1,
		depth: 2,
		bevelEnabled: true,
		bevelThickness: 1,
		bevelSize: 3,
		bevelOffset: 0,
		curveSegments: 200
	};    

	let material = new THREE.MeshPhysicalMaterial({
		color: 0xFF4500,
		opacity: 0.8,
		transparent: true,
		side: THREE.DoubleSide,
		emissive: 0x000000,
		roughness: 0.2,
		metalness: 0.93,
		reflectivity: 0.43}
	);

	let faceGeom = new THREE.ExtrudeGeometry( drawShape(), extrudeSettings );
	let fox = new THREE.Mesh( faceGeom, material );
	fox.castShadow = true;

	let material2 = new THREE.MeshPhongMaterial({
		color: 0x000000,
		shininess: 70});
	let material3 = new THREE.MeshPhongMaterial({
		color: 0x006400,
		opacity: 0.3,
		transparent: true,
		shininess: 70});

	let eyeRightG = new THREE.SphereGeometry(1);
	let eyeLftG = new THREE.SphereGeometry(0.8);
	eyeRight = new THREE.Mesh(eyeRightG, material2);
	eyeLeft = new THREE.Mesh(eyeLftG, material2);
	eyeRight.position.set(16, 24, 3);
	eyeLeft.position.set(24, 24, 3);

	let eyeBallRightG = new THREE.SphereGeometry(1.2);
	let eyeBallLftG = new THREE.SphereGeometry(1);
	eyeBallRight = new THREE.Mesh(eyeBallRightG, material3);
	eyeBallLeft = new THREE.Mesh(eyeBallLftG, material3);
	eyeBallRight.position.set(16, 24, 2.5);
	eyeBallLeft.position.set(24, 24, 2.5);

	let noseGeom = new THREE.SphereGeometry(2.1);
	let nose = new THREE.Mesh(noseGeom, material2);
	nose.position.set(32, 8, 1);

	let geometry = new THREE.ConeGeometry( 12, 55, 40 );
	let body = new THREE.Mesh( geometry, material );
	body.position.set(10, -15, 2);

	function addTree( x, y, z ) {
		let treeGeom = new THREE.CylinderGeometry( 2, 5, 150, 10, 30 );
		let treeMaterial = new THREE.MeshPhysicalMaterial({
			color: 0xDF6E1D,
			opacity: 0.5,
			transparent: true,
			flatShading: false,
			side: THREE.DoubleSide,
			emissive: 0x50505,
			roughness: 0.2,
			metalness: 0.96,
			reflectivity: 0.5});
		let tree = new THREE.Mesh(treeGeom, treeMaterial);
		tree.position.set( x, y, z );
		scene.add(tree);
	};
	addTree(-10, 35, -70);
	addTree(-30, 35, -50);
	addTree(-50, 35, -35);
	addTree(-70, 35, -10);
	addTree(-90, 35, 5);
	addTree(-110, 35, 20);
	addTree(-130, 35, 50);


	let leavesMaterial1 = new THREE.MeshPhysicalMaterial({
		color: 0x008000,
		wireframe: true,
		side: THREE.DoubleSide,
		emissive: 0x50505,
		roughness: 0.5,
		metalness: 0.96,
		reflectivity: 0.5});
	let leavesMaterial2 = new THREE.MeshPhysicalMaterial({
		color: 0x00FA9A,
		wireframe: true,
		side: THREE.DoubleSide,
		emissive: 0x50505,
		roughness: 0.5,
		metalness: 0.96,
		reflectivity: 0.5});
	function addLeaves1( x, y, z ) {
		let points = [];
		for ( let i = 0; i < 10; i ++ ) {
			points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 25 + 5, ( i - 5 ) * 4 ) );
		}
		let leavesGeom = new THREE.LatheGeometry( points );
		let leaves1 = new THREE.Mesh(leavesGeom, leavesMaterial1);
		leaves1.position.set( x, y, z );
		leaves1.rotation.x = 0.002;
		scene.add(leaves1);
	};

	function addLeaves2( x, y, z ) {
		let points = [];
		for ( let i = 0; i < 10; i ++ ) {
			points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 10 + 5, ( i - 5 ) * 10 ) );
			}
		let leavesGeom = new THREE.LatheGeometry( points );
		let leaves2 = new THREE.Mesh(leavesGeom, leavesMaterial2);
		leaves2.position.set( x, y, z );
		leaves2.rotation.x = 0.002;
		scene.add(leaves2);
	};

	addLeaves1(-10,100,-70);
	addLeaves2(-10,100,-70);
	addLeaves1(-30,110,-50);
	addLeaves2(-30,110,-50);
	addLeaves1(-50,115,-35);
	addLeaves2(-50,115,-35);
	addLeaves1(-70,120,-10);
	addLeaves2(-70,120,-10);
	addLeaves1(-90,125,5);
	addLeaves2(-90,125,5);
	addLeaves1(-110,120,20);
	addLeaves2(-110,120,20);
	addLeaves1(-130,115,50);
	addLeaves2(-130,115,50);

	function CustomSinCurve( scale ) {
		THREE.Curve.call( this );
		this.scale = ( scale === undefined ) ? 1 : scale;
	}
	CustomSinCurve.prototype = Object.create( THREE.Curve.prototype );
	CustomSinCurve.prototype.constructor = CustomSinCurve;
	CustomSinCurve.prototype.getPoint = function ( t ) {
		let tx = t * 3 - 1.5;
		let ty = Math.sin( 2 * Math.PI * t );
		let tz = 0;
		return new THREE.Vector3( tx, ty, tz ).multiplyScalar( this.scale );
	};
	let path = new CustomSinCurve(200);
	let geometryTube = new THREE.TubeGeometry( path, 80, 100, 60, false );
	let materialTube = new THREE.MeshPhysicalMaterial({
		color: 0x243aaf,
		wireframe: true,
		flatShading: true,
		side: THREE.DoubleSide,
		emissive: 0x50505,
		roughness: 0.1,
		metalness: 0.9,
		reflectivity: 0.43}
	);
	let tube = new THREE.Mesh( geometryTube, materialTube );
	tube.position.set(30, 30, -150)


	scene.add(
	fox,
	eyeRight,
	eyeLeft,
	eyeBallRight,
	eyeBallLeft,
	body,
	nose,
	tube,
	ambientLight,
	pointLight,
	dirLight,
	areaLight1,
	ground);

	renderer.setClearColor(new THREE.Color(0x0));
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMap.enabled = true;
	document.getElementById("threeOutput").appendChild(renderer.domElement);

	function render() {
		eyeRight.rotation.y += 0.03;
		eyeLeft.rotation.y += 0.02;
		tube.rotation.x += 0.003;
		tube.rotation.y += 0.003;
		tube.rotation.z += 0.005;
		requestAnimationFrame(render);
		controlsOrbit.update();
		renderer.render(scene, camera);
	}

	function onWindowResize() {
		renderer.setSize( window.innerWidth, window.innerHeight );
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
	}

	window.addEventListener( 'resize', onWindowResize, false );
	render();
}


