import { PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;

  beforeEach(() => {
    postsService = new PostsService();
  });

  describe('.findMany', () => {
    const posts = [
      {text: 'Post 1'},
      {text: 'Post 2'},
      {text: 'Post 3'},
      {text: 'Post 4'},
    ];

    beforeEach(() => {
      posts.forEach((post) => postsService.create(post));
    });

    it('should return all posts if called without options', () => {
      const result = postsService.findMany();
      expect(result.length).toBe(4);
      expect(result[0].text).toBe('Post 1');
      expect(result[1].text).toBe('Post 2');
      expect(result[2].text).toBe('Post 3');
      expect(result[3].text).toBe('Post 4');
    });

    it('should return correct posts for skip and limit options', () => {
      const result = postsService.findMany({ skip: 1, limit: 2 });
      expect(result.length).toBe(2);
      expect(result[0].text).toBe('Post 2');
      expect(result[1].text).toBe('Post 3');
    });

    it('should return correct posts when only skip option is provided', () => {
      const result = postsService.findMany({ skip: 2 });
      expect(result.length).toBe(2);
      expect(result[0].text).toBe('Post 3');
      expect(result[1].text).toBe('Post 4');
    });

    it('should return correct posts when only limit option is provided', () => {
      const result = postsService.findMany({ limit: 3 });
      expect(result.length).toBe(3);
      expect(result[0].text).toBe('Post 1');
      expect(result[1].text).toBe('Post 2');
      expect(result[2].text).toBe('Post 3');
    });

    it('should return empty array when skip is greater than posts length', () => {
      const result = postsService.findMany({ skip: 10 });
      expect(result.length).toBe(0);
    });

    it('should return all posts when limit is greater than posts length', () => {
      const result = postsService.findMany({ limit: 10 });
      expect(result.length).toBe(4);
    });

    it('should handle skip and limit when their sum exceeds posts length', () => {
      const result = postsService.findMany({ skip: 3, limit: 5 });
      expect(result.length).toBe(1);
      expect(result[0].text).toBe('Post 4');
    });
  });
});