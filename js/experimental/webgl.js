/**
 * Created by Деканат ФАИ on 06.06.14.
 */

$(function() {
    var height = 400;
    var width = 400;

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(35
        , width / height , 0.1, 1000);

    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColorHex(0xEEEEEE);
    renderer.setSize(width, height);
    renderer.setClearColorHex(0xEEEEEE, 1.0);
    renderer.setSize(width, height);
    renderer.shadowMapEnabled = true;

    var axes = new THREE.AxisHelper( 20 );
    //scene.add(axes);

    var planeGeometry = new THREE.PlaneGeometry(40,40,1,1);
    var planeMaterial = new THREE.MeshBasicMaterial({color: 0x29F241});
    var plane = new THREE.Mesh(planeGeometry,planeMaterial);
    plane.rotation.x=-0.5*Math.PI;
    plane.position.x = 0;
    plane.position.y = -4;
    plane.position.z = 0;
    plane.receiveShadow = true;
    scene.add(plane);

    var cubes = [];

    function createCube(x, y, z) {
        var cubeGeometry = new THREE.CubeGeometry(4,4,4);
        var cubeMaterial = new THREE.MeshLambertMaterial(
            {color: 0xff0000});
        var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

        cube.position.x = x;
        cube.position.y = y;
        cube.position.z = z;

        cube.castShadow = true;
        cube.receiveShadow = true;

        scene.add(cube);
        cubes.push(cube);
    }

    var R = 15;
    var cube_num = 10;
    for(var i = 0; i < cube_num; i++) {
        var x = R * Math.cos(2 * Math.PI / cube_num * i);
        var z = R * Math.sin(2 * Math.PI / cube_num * i);
        createCube(x, 0, z);
    }

    var sphereGeometry = new THREE.SphereGeometry(8,40,20);
    var sphereMaterial = new THREE.MeshLambertMaterial(
        {color: 0x7777ff});
    var sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
    sphere.position.x = 0;
    sphere.position.y = 0;
    sphere.position.z = 0;
    sphere.castShadow = true;
    scene.add(sphere);

    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;

    var spotLight = new THREE.SpotLight( 0xffffff );
    spotLight.position.set( -40, 60, -10 );
    spotLight.castShadow = true;
    scene.add(spotLight );

    $("#output").append(renderer.domElement);

    var fps = 0;

    setInterval(function(){
        $('#fps').text('FPS:' + fps);
        fps = 0;
    }, 1000);

    function renderScene() {
        fps++;

        for(var i = 0; i < cube_num; i++) {
            var cube = cubes[i];
            cube.rotation.x += 0.02;
            cube.rotation.y += 0.02;
            cube.rotation.z += 0.02;

            var a = 0.02;
            var x = cube.position.x;
            var z = cube.position.z;
            var x1 = x * Math.cos(a) - z * Math.sin(a);
            var z1 = x * Math.sin(a) + z * Math.cos(a);

            cube.position.x = x1;
            cube.position.z = z1;

            var a = 0.001;
            var x = camera.position.x;
            var z = camera.position.z;
            var x1 = x * Math.cos(a) - z * Math.sin(a);
            var z1 = x * Math.sin(a) + z * Math.cos(a);

            camera.position.x = x1;
            camera.position.z = z1;

            camera.lookAt(sphere.position);

//            camera.rotation.x += a;
//            camera.rotation.z += a;
        }

        requestAnimationFrame(renderScene);
        renderer.render(scene, camera);
    }

    renderScene();
});
