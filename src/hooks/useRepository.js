import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (id, first) => {
  const { data, loading, error, fetchMore, refetch } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId: id, first },
    fetchPolicy: 'cache-and-network',
  });

  const handleFetchMore = () => {
    if (loading || !data?.repository?.reviews?.pageInfo?.hasNextPage) {
      return;
    }

    fetchMore({
      variables: {
        repositoryId: id,
        first,
        after: data.repository.reviews.pageInfo.endCursor,
      },
    });
  };

  return {
    repository: data ? data.repository : undefined,
    loading,
    error,
    refetch,
    fetchMore: handleFetchMore,
  };
};

export default useRepository;
