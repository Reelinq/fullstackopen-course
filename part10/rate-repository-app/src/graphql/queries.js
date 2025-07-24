import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query Repositories {
		repositories {
			edges {
				node {
					fullName
					description
					language
					stargazersCount
					forksCount
					reviewCount
					ratingAverage
					ownerAvatarUrl
				}
			}
		}
	}
`;