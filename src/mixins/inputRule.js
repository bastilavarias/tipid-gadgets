const inputRuleMixin = {
    computed: {
        rules() {
            return {
                required: (value) => !!value || 'Required Input.',

                counter: (counter, value) => {
                    return (
                        (value || '').length >= counter ||
                        `Minimum of ${counter} characters.`
                    );
                },

                email: (value) => {
                    const pattern =
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return pattern.test(value) || 'Invalid e-mail.';
                },

                mobileNumber: (value) => {
                    const pattern = /^(9|\+639)\d{9}$/;
                    return pattern.test(value) || 'Invalid mobile number.';
                },

                landLineNumber: (value) => {
                    const pattern = /^\d{7}$/;
                    return pattern.test(value) || 'Invalid landline number.';
                },

                sameAs: (value1, value2, message) =>
                    value1 === value2 || message,

                youtubeURL: (value) => {
                    const pattern =
                        /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(\?\S*)?$/;
                    return pattern.test(value) || 'Invalid YouTube URL';
                },

                passwordCriteria: (value) => {
                    const pattern =
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
                    return (
                        pattern.test(value) ||
                        'Minimum eight characters, at least one uppercase letter, one lowercase letter and one number.'
                    );
                },

                zipCode: (value) => {
                    const pattern = /^[0-9]{4}$/;
                    return pattern.test(value) || 'Invalid zip code.';
                },

                year: (value) => {
                    const pattern = /^[0-9]{4}$/;
                    return pattern.test(value) || 'Invalid year.';
                },
            };
        },
    },
};

export default inputRuleMixin;
