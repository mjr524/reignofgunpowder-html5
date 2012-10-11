YAHOO.env.classMap = {"Container": "EaselJS", "ColorMatrix": "EaselJS", "BoxBlurFilter": "EaselJS", "ColorFilter": "EaselJS", "AlphaMaskFilter": "EaselJS", "Rectangle": "EaselJS", "MovieClipPlugin": "EaselJS", "SpriteSheetUtils": "EaselJS", "UID": "EaselJS", "MouseEvent": "EaselJS", "DisplayObject": "EaselJS", "AlphaMapFilter": "EaselJS", "BitmapAnimation": "EaselJS", "Graphics": "EaselJS", "Shadow": "EaselJS", "SpriteSheetBuilder": "EaselJS", "Ticker": "EaselJS", "SpriteSheet": "EaselJS", "ColorMatrixFilter": "EaselJS", "Filter": "EaselJS", "Command": "EaselJS", "MovieClip": "EaselJS", "DOMElement": "EaselJS", "Point": "EaselJS", "Text": "EaselJS", "Bitmap": "EaselJS", "Shape": "EaselJS", "Touch": "EaselJS", "Stage": "EaselJS", "Matrix2D": "EaselJS"};

YAHOO.env.resolveClass = function(className) {
    var a=className.split('.'), ns=YAHOO.env.classMap;

    for (var i=0; i<a.length; i=i+1) {
        if (ns[a[i]]) {
            ns = ns[a[i]];
        } else {
            return null;
        }
    }

    return ns;
};
