import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/schemas/product.schema';
import { ProductDto } from './product.dto';

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private productModel : Model<Product>){}

    async add(dto : ProductDto){
        const createdProduct = new this.productModel(dto);
        return await createdProduct.save();
    }

    async findAll(){
        return await this.productModel.find();
    }

    async findByKeyword(keyword: string){
        return await this.productModel.find(
            {
                title: {$regex : '.*' + keyword + '.*'}
        });
    }

    async findById(id : string){
        return await this.productModel.findById(id);
    }
}