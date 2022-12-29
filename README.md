# Image Processing API

An API that can perform basic resizing on images.


## Documentation

[Postman Documentation](https://documenter.getpostman.com/view/9903130/2s8Z6yXCyf)


## API Reference

#### Get All Images

```http
  GET /images/all
```

#### Process Image

```http
  GET /images/single?height=200&width=300&fileName=fjjord.jpg&outputFormat=png
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `height`      | `string` | **Required**. Height of image to transform. |
| `width`      | `string` | **Required**. Width of image to transform. |
| `fileName`      | `string` | **Required**. Name of the image to perform the transformation on. Refer to the `Get Images` route to fetch image filenames. |
| `outputFormat`      | `string` | **Required**. File type to convert the transformed image to. |

# image-processing-api

### Available endpoints?
 - Images Fetch `/images/all`
 - Images Process and Fetch `/images/single`
