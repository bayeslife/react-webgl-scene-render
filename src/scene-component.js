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

const SceneComponent =  () => {

    let setup = ()=>{

      const container = document.getElementById('thecontainer');

      var scene = new Scene();
      var camera = new PerspectiveCamera( 10, window.innerWidth / window.innerHeight, 0.1, 1000 );
      camera.position.set( 0, 20, 0 );

      var renderer = new WebGLRenderer();
      renderer.setSize( window.innerWidth, window.innerHeight );
      //renderer.setSize( 224, 224 );
      container.appendChild( renderer.domElement );

      var geometry = new SphereGeometry( tennisBallDiametetr, 8, 8 );
      var material = new MeshBasicMaterial( { color: 0x00ff00 } );
      var ball = new Mesh( geometry, material );
      ball.position.x=-courtLengthScale(100)
      ball.position.y=tennisBallDiametetr
      ball.position.z=0
      scene.add( ball  );

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

      let direction=1
      function animate() {
        requestAnimationFrame( animate );
        render()
      }
      //var speed = 3.14/4;
      function render() {
        var speed = Date.now() * 0.0001;
        camera.position.x = Math.cos(speed) * 70;
        camera.position.z = Math.sin(speed) * 70;
      
        camera.lookAt(-courtLengthScale(100) , 0, 0)
        renderer.render(scene, camera);
      }
      animate();
    }
    
    useEffect(setup)
    return <div id="thecontainer"/>
  }

    

export default SceneComponent

