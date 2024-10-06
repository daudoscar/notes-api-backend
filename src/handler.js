const { nanoid } = require('nanoid');
const notes = require('./notes');

/**
 * Penambahan catatan baru.
 * @param {Object} request - Objek request yang berisi payload dari client.
 * @param {Object} h - Objek Hapi response toolkit untuk mengirimkan respons.
 * @returns {Object} - Respons status berhasil atau gagal.
 */
const addNoteHandler = (request, h) => {
    const { title, tags, body } = request.payload;
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
        id, title, createdAt, updatedAt, tags, body,
    };

    notes.push(newNote);

    const isSuccess = notes.filter((note) => note.id === id).length > 0;

    if (isSuccess) {
        return h.response({
            status: 'success',
            message: 'Catatan berhasil ditambahkan!',
            data: {
                noteId: id,
            },
        }).code(201);
    }

    return h.response({
        status: 'error',
        message: 'Catatan gagal ditambahkan!',
    }).code(500);
};

/**
 * Menangani pengambilan semua catatan.
 * @returns {Object} - Respons yang berisi semua catatan.
 */
const getAllNotesHandler = () => ({
    status: 'success',
    data: {
        notes,
    },
});

/**
 * Pengambilan catatan berdasarkan ID.
 * @param {Object} request - Objek request yang berisi parameter id.
 * @param {Object} h - Objek Hapi response toolkit untuk mengirimkan respons.
 * @returns {Object} - Respons yang berisi catatan yang sesuai atau pesan gagal.
 */
const getNoteByIdHandler = (request, h) => {
    const { id } = request.params;
    const note = notes.filter((n) => n.id === id)[0];

    if (note) {
        return {
            status: 'success',
            data: {
                note,
            },
        };
    }

    return h.response({
        status: 'fail',
        message: 'Catatan tidak ditemukan!',
    }).code(404);
};

/**
 * Pembaruan catatan berdasarkan ID.
 * @param {Object} request - Objek request yang berisi parameter id dan payload data catatan yang diperbarui.
 * @param {Object} h - Objek Hapi response toolkit untuk mengirimkan respons.
 * @returns {Object} - Respons status berhasil atau gagal.
 */
const editNoteByIdHandler = (request, h) => {
    const { id } = request.params;
    const { title, tags, body } = request.payload;
    const updatedAt = new Date().toISOString();

    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1) {
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updatedAt,
        };
        return h.response({
            status: 'success',
            message: 'Catatan berhasil diperbarui!',
        }).code(200);
    }

    return h.response({
        status: 'fail',
        message: 'Gagal memperbarui catatan. Id tidak ditemukan!',
    }).code(404);
};

/**
 * Penghapusan catatan berdasarkan ID.
 * @param {Object} request - Objek request yang berisi parameter id.
 * @param {Object} h - Objek Hapi response toolkit untuk mengirimkan respons.
 * @returns {Object} - Respons status berhasil atau gagal.
 */
const deleteNoteByIdHandler = (request, h) => {
    const { id } = request.params;

    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1) {
        notes.splice(index, 1);
        return h.response({
            status: 'success',
            message: 'Catatan berhasil dihapus!',
        }).code(200);
    }

    return h.response({
        status: 'fail',
        message: 'Catatan gagal dihapus. Id tidak ditemukan!',
    }).code(404);
};

module.exports = {
    addNoteHandler,
    getAllNotesHandler,
    getNoteByIdHandler,
    editNoteByIdHandler,
    deleteNoteByIdHandler,
};
