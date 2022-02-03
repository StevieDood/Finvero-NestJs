import {
  Controller,
  Post,
  Delete,
  Res,
  HttpStatus,
  Body,
  Get,
  Put,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('/create')
  async createPost(@Res() res, @Body() createProductDTO: CreateProductDTO) {
    const product = await this.productService.createProduct(createProductDTO);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Product successfuly created', product });
  }

  @Get('/')
  async getProducts(@Res() res) {
    const allProducts = await this.productService.getProducts();
    return res.status(HttpStatus.OK).json({ allProducts });
  }

  @Get('/:productId')
  async getProductById(@Res() res, @Param('productId') productId) {
    const productById = await this.productService.getProduct(productId);
    if (!productById) throw new NotFoundException('Product not found!');
    return res.status(HttpStatus.OK).json({ productById });
  }

  @Put('/:productId')
  async updateProduct(
    @Res() res,
    @Param('productId') productId,
    @Body() createProductDTO: CreateProductDTO,
  ) {
    const updatedProduct = await this.productService.updateProduct(
      productId,
      createProductDTO,
    );
    if (!updatedProduct) throw new NotFoundException('Product not found!');
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Product successfully updated', updatedProduct });
  }

  @Delete('/delete/:productId')
  async deleteProduct(@Res() res, @Param('productId') productId) {
    const deletedProduct = await this.productService.deleteProduct(productId);
    if (!deletedProduct) throw new NotFoundException('Product not found!');
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Product successfuly deleted', deletedProduct });
  }
}
