export class CreateMemeDto {
  idUsuario: number;
  descripcion?: string;
  superior?: string;
  topText?: string;
  inferior?: string;
  bottomText?: string;
  estado?: string;
  imagen?: string;
  image?: string;
  selectedImage?: string;
  idPlantilla?: number;
}
