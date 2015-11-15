function Terrain(scene, texture, heightmap) {
    CGFobject.call(this, scene);
    
    this.scene = scene;
    
    this.shader = new CGFshader(this.scene.gl,"shaders/terrain.vert","shaders/terrain.frag");
    this.plane = new Plane(this.scene,128);
    
    this.colorMap = new CGFtexture(this.scene,texture);
    this.hMap = new CGFtexture(this.scene,heightmap);
    
    this.shader.setUniformsValues({
        hMap: 0,
        colorMap: 1
    });



}
;

Terrain.prototype = Object.create(CGFobject.prototype);
Terrain.prototype.constructor = Terrain;

Terrain.prototype.display = function() {
    
    this.scene.setActiveShader(this.shader);
    this.hMap.bind(0);
    this.colorMap.bind(1);
    this.plane.display();
    
    this.scene.setActiveShader(this.scene.defaultShader);

}

Terrain.prototype.updateTextCoords = function(s, t) {}
;
