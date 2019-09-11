import React, { useEffect } from 'react';

import { VertexColors,Geometry, Vector3,Line, LineBasicMaterial,PerspectiveCamera, WebGLRenderer,Scene, SphereGeometry, MeshBasicMaterial,Mesh } from 'three'

import { scaleLinear } from 'd3-scale'

const courtLength= 23.77
const doublesCourtWidth = 10.97
const singlesCourtWidth = 8.23
const netHeight= 0.914
const tennisBallDiametetr= 0.065

let courtLengthScale = scaleLinear().domain([-100,100]).range([-courtLength/2,courtLength/2])

let doublesWidthScale = scaleLinear().domain([-100,100]).range([-doublesCourtWidth/2,doublesCourtWidth/2])
let singlesWidthScale = scaleLinear().domain([-100,100]).range([-singlesCourtWidth/2,singlesCourtWidth/2])
let netHeightScale = scaleLinear().domain([0,100]).range([0,netHeight])

const CAMERA_DISTANCE_FROM_BALL = courtLength //A higher value is further away from the ball

const HEIGHT_ABOVE_COURT = 1.75 //A higher value is further away from the ball

let ballposition = {
  x:-courtLengthScale(100),
  y: tennisBallDiametetr,
  z: 0
}

let renderBall = (scene) =>{
  var geometry = new SphereGeometry( tennisBallDiametetr/2, 8, 8 );
  var material = new MeshBasicMaterial( { color: 0x00ff00 } );
  var ball = new Mesh( geometry, material );
  ball.position.x=ballposition.x
  ball.position.y=ballposition.y
  ball.position.z=ballposition.z
  scene.add( ball  );
  return ball
}


let renderCourt = (scene) =>{
  var material = new LineBasicMaterial( { color: 'teal' , linewidth: 1} );

  {
    var geometry = new Geometry();
    geometry.vertices.push(new Vector3( courtLengthScale(100) , 0, doublesWidthScale(100)))
    geometry.vertices.push(new Vector3( courtLengthScale(100) , 0, -doublesWidthScale(100)))
    geometry.vertices.push(new Vector3( -courtLengthScale(100) , 0, -doublesWidthScale(100)))
    geometry.vertices.push(new Vector3( -courtLengthScale(100) , 0, doublesWidthScale(100)))
    geometry.vertices.push(new Vector3( courtLengthScale(100) , 0, doublesWidthScale(100)) )
    var doublesLine = new Line( geometry, material );
    scene.add(doublesLine)
  }
  {
    var geometry = new Geometry();
    geometry.vertices.push(new Vector3( courtLengthScale(100) , 0, singlesWidthScale(100)))
    geometry.vertices.push(new Vector3( courtLengthScale(100) , 0, -singlesWidthScale(100)))
    geometry.vertices.push(new Vector3( -courtLengthScale(100) , 0, -singlesWidthScale(100)))
    geometry.vertices.push(new Vector3( -courtLengthScale(100) , 0, singlesWidthScale(100)))
    geometry.vertices.push(new Vector3( courtLengthScale(100) , 0, singlesWidthScale(100)) )
    var singlesLine = new Line( geometry, material );
    scene.add(singlesLine)
  }
  {
    var geometry = new Geometry();
    geometry.vertices.push(new Vector3( courtLengthScale(100) , 0, 0))
    geometry.vertices.push(new Vector3( -courtLengthScale(100) , 0, 0))
    var centerLine = new Line( geometry, material );
    scene.add(centerLine)
  }
  {
    var geometry = new Geometry();
    geometry.vertices.push(new Vector3( courtLengthScale(50) , 0, -singlesWidthScale(100)))
    geometry.vertices.push(new Vector3( courtLengthScale(50) , 0, singlesWidthScale(100)))
    var serviceLine1 = new Line( geometry, material );
    scene.add(serviceLine1)
  }
  {
    var geometry = new Geometry();
    geometry.vertices.push(new Vector3( -courtLengthScale(50) , 0, -singlesWidthScale(100)))
    geometry.vertices.push(new Vector3( -courtLengthScale(50) , 0, singlesWidthScale(100)))
    var serviceLine2 = new Line( geometry, material );
    scene.add(serviceLine2)
  }
  {
    var geometry = new Geometry();
    geometry.vertices.push(new Vector3( courtLengthScale(0) , netHeightScale(0), -doublesWidthScale(100)))
    geometry.vertices.push(new Vector3( courtLengthScale(0) , netHeightScale(0), doublesWidthScale(100)))
    geometry.vertices.push(new Vector3( courtLengthScale(0) , netHeightScale(100), doublesWidthScale(100)))
    geometry.vertices.push(new Vector3( courtLengthScale(0) , netHeightScale(100), -doublesWidthScale(100)))
    geometry.vertices.push(new Vector3( courtLengthScale(0) , netHeightScale(0), -doublesWidthScale(100)))
    var net = new Line( geometry, material );
    scene.add(net)
  }
}


const SceneComponent =  (props) => {

    let setup = ()=>{

      let {
        distance=CAMERA_DISTANCE_FROM_BALL, 
        imageWidth=window.innerWidth,
        imageHeight=window.innerHeight,
        height=window.innerHeight,
      } = props

      const container = document.getElementById('thescene');

      let scene = new Scene();
      let camera = new PerspectiveCamera( distance, window.innerWidth / window.innerHeight, 0.1, 1000 );
      camera.position.set( 0, HEIGHT_ABOVE_COURT, 0 ); //This set up the Y dimension to be above the X,Z plane

      var renderer = new WebGLRenderer();
      renderer.setSize( imageWidth, imageHeight );
      container.appendChild( renderer.domElement );

      let ball = renderBall(scene)
      renderCourt(scene)
  

      function animate() {
        requestAnimationFrame( animate );
        render()
      }
      //var speed = 3.14/4;

      let viewradius = courtLength/2

      let direction=1
      function render() {
        var speed = Date.now() * 0.0001;

        direction = direction ? (ball.position.x > courtLength/2 ? -1 : direction) : (ball.position.x < -(courtLength/2) ? 1 : direction)  

        console.log(`${ball.position.x}: ${-courtLength/22}`)
        ball.position.x += 0.1 * direction 
        camera.position.x = ballposition.x + Math.cos(speed) * viewradius ;
        camera.position.z = ballposition.z + Math.sin(speed) * viewradius;
        camera.lookAt(-courtLengthScale(100) , 0, 0)
        renderBall(scene)
        renderer.render(scene, camera);
      }
      animate();
    }

    useEffect(setup)
    return <div id="thescene"/>
  }

    

export default SceneComponent

