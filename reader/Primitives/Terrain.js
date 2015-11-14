function Terrain(scene, texture, heightmap){
    
    this.scene = scene;

    this.shader = new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");
    this.plane = new Plane(this.scene, 128);

    this.shader.setUniformsValues({hMap: 0});
    this.shader.setUniformsValues({colorMap: 1});

    this.colormap = new CGFtexture(this.scene, texture);
    this.hmap = new CGFtexture(this.scene, heightmap);

};

Terrain.prototype = Object.create(CGFobject.prototype);
Terrain.prototype.constructor = Terrain;

Terrain.prototype.display = function(){

    this.scene.setActiveShader(this.shader);
    this.colormap.bind(1);
    this.hmap.bind(0);
    this.plane.display();
    
    this.scene.setActiveShader(this.scene.defaultShader);

}

Terrain.prototype.updateTextCoords = function(s,t){};