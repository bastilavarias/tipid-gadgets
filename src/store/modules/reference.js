import apiService from '@/services/api';
import { GET_LOCATIONS } from '@/store/types/reference';

const referenceModule = {
    actions: {
        async [GET_LOCATIONS]() {
            try {
                let locations =
                    JSON.parse(window.localStorage.getItem('locations')) || [];
                if (locations.length > 0) return locations;
                const response = await apiService.get('/reference/locations');
                locations = response.data.data;
                window.localStorage.setItem(
                    'locations',
                    JSON.stringify(locations)
                );
                return locations;
            } catch (error) {
                return [];
            }
        },
    },
};

export default referenceModule;
