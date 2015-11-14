function Terrain(scene, texture, heightmap){
    
    this.scene = scene;

    this.shader = new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");
    this.plane = new Plane(this.scene, 128);

    this.shader.setUniformsValues({hMap: 1});
    this.shader.setUniformsValues({colorMap: 2});

    this.colormap = new CGFtexture(this.scene, "shaders/colorMap.jpg");
    this.hmap = new CGFtexture(this.scene, "shaders/hmap.jpg");

};

Terrain.prototype = Object.create(CGFobject.prototype);
Terrain.prototype.constructor = Terrain;

Terrain.prototype.display = function(){

    this.scene.setActiveShader(this.shader);
    this.colormap.bind(2);
    this.hmap.bind(1);
    this.plane.display();
    
    this.scene.setActiveShader(this.scene.defaultShader);

}

Terrain.prototype.updateTextCoords = function(s,t){};