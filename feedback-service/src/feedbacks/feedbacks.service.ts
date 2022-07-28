import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { catchError, concatMap, from, map, mergeMap, of, toArray } from 'rxjs';
import { identitiesServiceToken, IIdentitiesService } from '../identities';
import { GetUserDetailsResponse } from '../identities/response';
import { AddNewFeedbackDto, UpdateFeedbackDto } from './dtos';
import { Feedback, FeedbackDocument } from './schemas';

@Injectable()
export class FeedbacksService implements OnModuleInit {
  private _identitiesService!: IIdentitiesService;

  constructor(
    @InjectModel(Feedback.name)
    private readonly _feedbackModel: Model<FeedbackDocument>,

    @Inject(identitiesServiceToken) private readonly _client: ClientGrpc,
  ) {}

  onModuleInit() {
    this._identitiesService =
      this._client.getService<IIdentitiesService>('Identities');
  }

  findListForTarget(topicId?: string, ownerId?: string) {
    let predicate = {};

    if (!!topicId) predicate = { topicId };
    if (!!ownerId) predicate = { ownerId };

    return from(
      this._feedbackModel.where(predicate).sort({ createdAt: 'desc' }).exec(),
    ).pipe(
      mergeMap((feedbacks) =>
        from(feedbacks).pipe(
          concatMap((feedback) => this.getUserDetailsForFeedback(feedback)),
        ),
      ),
      toArray(),
    );
  }

  addNew(dto: AddNewFeedbackDto) {
    const feedback = new this._feedbackModel(dto);
    return from(feedback.save());
  }

  update(id: string, dto: UpdateFeedbackDto) {
    return from(
      this._feedbackModel.findByIdAndUpdate(
        id,
        { ...dto, updatedAt: new Date() },
        { returnOriginal: false },
      ),
    );
  }

  remove(id: string) {
    return from(this._feedbackModel.findByIdAndRemove(id));
  }

  private getUserDetailsForFeedback(feedback: FeedbackDocument) {
    return this._identitiesService
      .getUserDetails({ id: feedback.ownerId })
      .pipe(
        catchError(() =>
          of<GetUserDetailsResponse>({
            id: '',
            email: '',
            firstName: '',
            lastName: '',
            fullName: '',
            phoneNumber: '',
            dateOfBirth: '',
            gender: '',
            avatarUrl: '',
          }),
        ),
        map((owner) => {
          const { ownerId, ...rest } = feedback.toJSON();
          return { ...rest, owner };
        }),
      );
  }
}
