import { AddImage } from './types'

export class ImageUtil {
  static imagePrefix = '[image]'
  static #addImagePrefix = '[add-image]'

  static hasImage(value: string) {
    return this.#isImage(value) || this.isAddImage(value)
  }

  static #isImage(value: string) {
    return value.startsWith(this.imagePrefix)
  }

  static isAddImage(value: string) {
    return value.startsWith(this.#addImagePrefix)
  }

  static filterImagePrefix(value: string) {
    if (this.#isImage(value)) return value.substring(this.imagePrefix.length)
    if (this.isAddImage(value)) return value.substring(this.#addImagePrefix.length)
    return value
  }

  static valueToAddImage(value: string) {
    return JSON.parse(this.filterImagePrefix(value)) as AddImage
  }

  static fileToString(file: File) {
    const image: AddImage = {
      lastModified: file.lastModified,
      name: file.name,
      srcUrl: URL.createObjectURL(file),
    }
    return this.#addImagePrefix + JSON.stringify(image)
  }

  static findImage(addImage: AddImage, files: File[]) {
    return files.find(file => file.lastModified === addImage.lastModified && file.name === addImage.name)!
  }
}
