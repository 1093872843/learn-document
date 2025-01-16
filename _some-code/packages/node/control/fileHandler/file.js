// 文件相关处理
const fs = require('fs-extra');
const path = require('path');
const multer = require('multer');
const {app} = require("@/server.js")
// 上传文件保存的目录
const UPLOAD_DIR = path.resolve(__dirname, 'uploads');
// 确保上传目录存在
fs.ensureDirSync(UPLOAD_DIR);

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, UPLOAD_DIR),
    filename: (req, file, cb) => cb(null, file.originalname),
});

const upload = multer({ storage });
/**
 * 上传接口：支持断点续传
 * 请求体应包含：
 * - filename: 文件名
 * - chunkIndex: 当前分片索引
 * - totalChunks: 总分片数
 * - chunkData: 当前分片的Base64数据
 */
app.post('/file/resumeUpload',upload.single('file'), async (req, res) => {
    const { filename, chunkNumber, totalChunks } = req.body;
    const chunkPath = path.join(UPLOAD_DIR, `${filename}-chunk-${chunkNumber}`);
    fs.renameSync(req.file.path, chunkPath);

    // 合并分片
    if (Number(chunkNumber) === Number(totalChunks)) {
        const filePath = path.join(UPLOAD_DIR, filename);
        const writeStream = fs.createWriteStream(filePath);

        for (let i = 0; i < totalChunks; i++) {
            const chunkFile = path.join(UPLOAD_DIR, `${filename}-chunk-${i}`);
            const chunkData = fs.readFileSync(chunkFile);
            writeStream.write(chunkData);
            fs.unlinkSync(chunkFile); // 删除分片
        }
        writeStream.end();
    }

    res.send('Chunk received');
});