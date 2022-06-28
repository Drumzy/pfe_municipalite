import { HttpException, HttpStatus } from '@nestjs/common';
import { diskStorage, FileFilterCallback } from 'multer';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';
import * as dotenv from 'dotenv';
import { existsSync, mkdirSync } from 'fs';
import { Request } from 'express';
dotenv.config();

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

function uuidRandom(file: Express.Multer.File) {
  const result = `${uuid()}${extname(file.originalname)}`;
  return result;
}

export const multerOptions = {
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback,
  ) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png|webp|gif|pdf)$/)) {
      cb(null, true);
    } else {
      cb(
        new HttpException(
          `Unsupported file type ${extname(file.originalname)}`,
          HttpStatus.BAD_REQUEST,
        ),
      );
    }
  },
  storage: diskStorage({
    destination: (
      req: Request,
      file: Express.Multer.File,
      cb: DestinationCallback,
    ) => {
      const uploadPath = process.env.VEHICULES_ATTACHEMENTS_DESTINATION;
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }
      cb(null, uploadPath);
    },
    filename: (
      req: Request,
      file: Express.Multer.File,
      cb: FileNameCallback,
    ) => {
      cb(null, uuidRandom(file));
    },
  }),
};

export const multerOptions_IT = {
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback,
  ) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png|webp|gif|pdf)$/)) {
      cb(null, true);
    } else {
      cb(
        new HttpException(
          `Unsupported file type ${extname(file.originalname)}`,
          HttpStatus.BAD_REQUEST,
        ),
      );
    }
  },
  storage: diskStorage({
    destination: (
      req: Request,
      file: Express.Multer.File,
      cb: DestinationCallback,
    ) => {
      const uploadPath = process.env.VEHICULES_ATTACHEMENTS_IT_DESTINATION;
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }
      cb(null, uploadPath);
    },
    filename: (
      req: Request,
      file: Express.Multer.File,
      cb: FileNameCallback,
    ) => {
      cb(null, uuidRandom(file));
    },
  }),
};

export const multerOptions_AS = {
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback,
  ) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png|webp|gif|pdf)$/)) {
      cb(null, true);
    } else {
      cb(
        new HttpException(
          `Unsupported file type ${extname(file.originalname)}`,
          HttpStatus.BAD_REQUEST,
        ),
      );
    }
  },
  storage: diskStorage({
    destination: (
      req: Request,
      file: Express.Multer.File,
      cb: DestinationCallback,
    ) => {
      const uploadPath = process.env.VEHICULES_ATTACHEMENTS_AS_DESTINATION;
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }
      cb(null, uploadPath);
    },
    filename: (
      req: Request,
      file: Express.Multer.File,
      cb: FileNameCallback,
    ) => {
      cb(null, uuidRandom(file));
    },
  }),
};

export const multerOptions_CG = {
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback,
  ) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png|webp|gif|pdf)$/)) {
      cb(null, true);
    } else {
      cb(
        new HttpException(
          `Unsupported file type ${extname(file.originalname)}`,
          HttpStatus.BAD_REQUEST,
        ),
      );
    }
  },
  storage: diskStorage({
    destination: (
      req: Request,
      file: Express.Multer.File,
      cb: DestinationCallback,
    ) => {
      const uploadPath = process.env.VEHICULES_ATTACHEMENTS_CG_DESTINATION;
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }
      cb(null, uploadPath);
    },
    filename: (
      req: Request,
      file: Express.Multer.File,
      cb: FileNameCallback,
    ) => {
      cb(null, uuidRandom(file));
    },
  }),
};

export const multerOptions_VI = {
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback,
  ) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png|webp|gif|pdf)$/)) {
      cb(null, true);
    } else {
      cb(
        new HttpException(
          `Unsupported file type ${extname(file.originalname)}`,
          HttpStatus.BAD_REQUEST,
        ),
      );
    }
  },
  storage: diskStorage({
    destination: (
      req: Request,
      file: Express.Multer.File,
      cb: DestinationCallback,
    ) => {
      const uploadPath = process.env.VEHICULES_ATTACHEMENTS_VI_DESTINATION;
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }
      cb(null, uploadPath);
    },
    filename: (
      req: Request,
      file: Express.Multer.File,
      cb: FileNameCallback,
    ) => {
      cb(null, uuidRandom(file));
    },
  }),
};
