# Working with SVGs

We manually normalized all `.svg` files to uniform size 512px by writing the `width` and `height` property into the `<svg>` tag. That is each svg internally looks similar to `<svg ...propertyX="bla" width="512" height="512>`.

NOTE: Firefox silently fails (does not show the `.svg`) if only one of `width` or `height` is present. Therefore, always set both properties on each image.
