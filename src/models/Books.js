export class Books {
    constructor(
        nombre,
        categoria,
        editorial,
        fecha_publicacion,
        volumen,
    ) {
        this.nombre = nombre;
        this.categoria = categoria;
        this.editorial = editorial;
        this.fecha_publicacion = fecha_publicacion;
        this.volumen = volumen;
    }
    toString() {
        return this.nombre + ',' + this.categoria + ',' + this.editorial + ',' + this.fecha_publicacion + ',' + this.volumen;
    };
}