import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    NotFoundException,
} from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
    messagesService: MessagesService;

    constructor() {
        // DONT DO THIS IN Real APPS
        this.messagesService = new MessagesService();
    }

    @Get()
    listMessages() {
        return this.messagesService.findAll();
    }

    @Post()
    createMessage(@Body() body: CreateMessageDto) {
        return this.messagesService.create(body.content);
    }

    @Get('/:id')
    async getMessage(@Param('id') id: string) {
        const result = await this.messagesService.findOne(id);

        if (!result) {
            throw new NotFoundException('Message not found');
        }

        return result;
    }
}
