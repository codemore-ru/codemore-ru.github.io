var R = 15;
var cube_num = 10;
var cube_color = 'red';
var rot_a = 0.002;
var cam_rot_a = 0.0005;

var cubes = [];
var scene = new THREE.Scene();

function createCube(x, y, z) {
    var cubeGeometry = new THREE.BoxGeometry(4,4,4);
    var cubeMaterial = new THREE.MeshLambertMaterial(
        {color: cube_color});
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

    cube.position.x = x;
    cube.position.y = y;
    cube.position.z = z;

    cube.castShadow = true;
    cube.receiveShadow = true;

    scene.add(cube);
    cubes.push(cube);
}

function createAllCubes() {
    cubes = [];
    for(var i = 0; i < cube_num; i++) {
        var x = R * Math.cos(2 * Math.PI / cube_num * i);
        var z = R * Math.sin(2 * Math.PI / cube_num * i);
        createCube(x, 0, z);
    }
}

function removeCubes() {
    for(var i = 0; i < cube_num; i++) {
        scene.remove(cubes[i]);
    }
}

function rotate(obj, angle) {
    var x = obj.position.x;
    var z = obj.position.z;

    var x1 = x * Math.cos(angle) - z * Math.sin(angle);
    var z1 = x * Math.sin(angle) + z * Math.cos(angle);

    obj.position.x = x1;
    obj.position.z = z1;
}

$(function() {
    var height = 400;
    var width = 400;

    var camera = new THREE.PerspectiveCamera(35
        , width / height , 0.1, 1000);

    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xEEEEEE);
    renderer.setSize(width, height);
    renderer.shadowMapEnabled = true;

    var planeGeometry = new THREE.PlaneGeometry(40,40,1,1);
    var planeMaterial = new THREE.MeshLambertMaterial({color: 0x29F241});
    var plane = new THREE.Mesh(planeGeometry,planeMaterial);
    plane.rotation.x=-0.5*Math.PI;
    plane.position.x = 0;
    plane.position.y = -4;
    plane.position.z = 0;
    plane.receiveShadow = true;
    scene.add(plane);

    createAllCubes();

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
    scene.add(spotLight);

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
            rotate(cubes[i], rot_a);
        }
        rotate(camera, cam_rot_a);
        camera.lookAt(sphere.position);

        requestAnimationFrame(renderScene);
        renderer.render(scene, camera);
    }

    renderScene();
});

$(function() {
    $('#apply').click(function() {
        removeCubes();

        cube_num = parseInt($('#cubes').val()) || 10;
        cube_color = $('#cube-color').val();
        R = parseInt($('#radius').val()) || 15;
        rot_a = parseFloat($('#cube-speed').val()) || 0.002;
        cam_rot_a = parseFloat($('#scene-speed').val()) || 0.0005;

        createAllCubes();
    });
});