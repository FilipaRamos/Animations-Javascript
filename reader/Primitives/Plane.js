function Plane(scene, divisions){

 	CGFobject.call(this,scene);

    this.divisions = divisions;
   	this.surfaces;
 
    var nurbsSurface = new CGFnurbsSurface(1, 1, [0, 0, 1, 1], [0, 0, 1, 1], [[-0.5, 0.0, 0.5, 1 ], [-0.5, 0.0, -0.5, 1 ], [ 0.5, 0.0,  0.5, 1 ], [ 0.5, 0.0, -0.5, 1 ]]);
	getSurfacePoint = function(u, v) {
		return nurbsSurface.getPoint(u, v);
	};

	this.surfaces = new CGFnurbsObject(this.scene, getSurfacePoint, this.divisions, this.divisions);	


};

Plane.prototype = Object.create(CGFobject.prototype);
Plane.prototype.constructor = Plane;

Plane.prototype.display = function () 
{
    this.scene.pushMatrix();
	this.surfaces.display();
	this.scene.popMatrix();
};