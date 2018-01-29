import { Education } from './education';
import { PortfolioItem } from './portfolio-item';
import { Skill } from './skill';
import { WorkExperience } from './work-experience';
import { ContactInformation } from './contact-infomation';
import { Entity } from './entity';
import { SocialInformation } from './social-infomation';
import { PersonalInformation } from './personal-information';
import { Address } from './address';

export class Profile extends Entity {

    constructor(
        id: string,
        public about: string,
        public contactInformation: ContactInformation,
        public education: Education[],
        public image: string,
        public message: string,
        public personalInformation: PersonalInformation,
        public portfolio: PortfolioItem[],
        public skills: Skill[],
        public socialInformation: SocialInformation,
        public type: string,
        public userName: string,
        public workExperiences: WorkExperience[],
    ) {
        super(id);
    }

    public setUserName(userName: string): void {
        this.userName = userName;
    }

    public static empty(): Profile {
        return new Profile(null, null, null, null, null, null, null, null, null, null, null, null, null);
    }

    public static getProfileBarendErasmus(): Profile {
        return new Profile(
            'Experienced Software Engineer with a demonstrated history of working in the agriculture and medical industry.',
            '14 Santa Barbara, 63 Blaauwberg Road, Table View, Cape Town, South Africa, 7441',
            new ContactInformation(
                new Address('Cape Town', 'South Africa', '14 Santa Barbara', '63 Blaauwberg Road, Table View', '7441'),
                '0766542813',
                'developersworkspace@gmail.com'
            ),
            [
                new Education(
                    'The school is situated at the foot of Table Mountain right next to the historical Welgemeend in Cape Town. The school has an enrolment of approximately 500 pupils, who are divided into three houses: Reijger, Dromedaris and De Goede Hoop, named after the three ships that Jan van Riebeeck landed in Cape Town in 1652.',
                    new Date(2010, 0, 1),
                    'Jan van Riebeeck High',
                    'National Senior Cerificate',
                    new Date(2014, 11, 1),
                ),
            ],
            'https://media-exp2.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAVqAAAAJDk4NTNjMDc4LTczNTctNDZmMC1iMGEyLWQyOTg3ODFhN2E3Mw.jpg',
            '',
            new PersonalInformation(
                new Date(1996, 4, 23),
                'Barend',
                'Erasmus'
            ),
            [
                new PortfolioItem(
                    'BragStones is a mobile application where proud users can create scrapbook albums about their children and/or grandchildren.',
                    'https://via.placeholder.com/300x300',
                    'https://play.google.com/store/apps/details?id=com.viaafrika.bragstones&hl=en',
                    'BragStones',
                ),
                new PortfolioItem(
                    'Via Afrika CareerCompass has been created to help you decide which career path might be the perfect fit for you.',
                    'https://via.placeholder.com/300x300',
                    'https://play.google.com/store/apps/details?id=com.viaafrika.careercompass&hl=en',
                    'CareerCompass',
                ),
                new PortfolioItem(
                    'Mirrovest is a web-based trading platform that integrates into iress, a world-renowned trading platform used by thousands of live traders.',
                    'https://via.placeholder.com/300x300',
                    null,
                    'Mirrovest',
                ),
                new PortfolioItem(
                    'ePONS is a patient monitoring support tool that tracks the improvements that a patient makes after a life-altering event, such as a stroke or amputation.',
                    'https://via.placeholder.com/300x300',
                    'http://epons.sadfm.co.za',
                    'Electronic Patient Outcomes Nursing System',
                ),
                new PortfolioItem(
                    'Medical Department Universal Systems Automation',
                    'https://via.placeholder.com/300x300',
                    'http://www.synapseon.com/',
                    'Medusa',
                ),
                new PortfolioItem(
                    'Passport is a global market research database providing insight on industries, economies and consumers worldwide, helping our clients analyse market context and identify future trends impacting businesses globally.',
                    'https://via.placeholder.com/300x300',
                    'http://go.euromonitor.com/passport.html',
                    'Passport',
                ),
                new PortfolioItem(
                    'Research Monitor features simple search functionality and content in many languages, offering users, regardless of location and experience, easy answers to research questions.',
                    'https://via.placeholder.com/300x300',
                    'http://go.euromonitor.com/research-monitor.html',
                    'Research Monitor',
                ),
            ],
            [
                new Skill(
                    'Android is a mobile operating system developed by Google, based on a modified version of the Linux kernel and other open source software and designed primarily for touchscreen mobile devices such as smartphones and tablets.',
                    'Intermediate',
                    'Java (Android)',
                    1,
                ),
                new Skill(
                    'Angular is a TypeScript-based open-source front-end web application platform led by the Angular Team at Google and by a community of individuals and corporations. Angular is a complete rewrite from the same team that built AngularJS.',
                    'Advanced',
                    'Angular',
                    2,
                ),
                new Skill(
                    'The Apache HTTP Server, colloquially called Apache, is free and open-source cross-platform web server software, released under the terms of Apache License 2.0',
                    'Intermediate',
                    'Apache',
                    1,
                ),
                new Skill(
                    'Bitbucket is a web-based version control repository hosting service owned by Atlassian, for source code and development projects that use either Mercurial or Git revision control systems. Bitbucket offers both commercial plans and free accounts.',
                    'Advanced',
                    'Bitbucket',
                    2,
                ),
                new Skill(
                    'Bootstrap is a free and open-source front-end web framework for designing websites and web applications.',
                    'Advanced',
                    'Boostrap',
                    4,
                ),
                new Skill(
                    'Keeping track of all these packages and making sure they are up to date (or set to the specific versions you need) is tricky. Bower to the rescue!',
                    'Intermediate',
                    'Bower',
                    1,
                ),
                new Skill(
                    'C++ is a general-purpose programming language. It has imperative, object-oriented and generic programming features, while also providing facilities for low-level memory manipulation.',
                    'Novice',
                    'C++',
                    1,
                ),
                new Skill(
                    'C# is a multi-paradigm programming language encompassing strong typing, imperative, declarative, functional, generic, object-oriented, and component-oriented programming disciplines.',
                    'Superior',
                    'C#',
                    6,
                ),
                new Skill(
                    'CSS3 is the latest evolution of the Cascading Style Sheets language and aims at extending CSS2.',
                    'Intermediate',
                    'CSS 3',
                    3,
                ),
                new Skill(
                    'D3.js is a JavaScript library for producing dynamic, interactive data visualizations in web browsers. It makes use of the widely implemented SVG, HTML5, and CSS standards. It is the successor to the earlier Protovis framework.',
                    'Intermediate',
                    'D3.js',
                    2,
                ),
                new Skill(
                    'Debian is a Unix-like computer operating system that is composed entirely of free software and packaged by a group of individuals participating in the Debian Project.',
                    'Intermediate',
                    'Debian',
                    1,
                ),
                new Skill(
                    'Docker is a software technology providing containers, promoted by the company Docker, Inc. Docker provides an additional layer of abstraction and automation of operating-system-level virtualization on Windows and Linux.',
                    'Advanced',
                    'Docker',
                    2,
                ),
                new Skill(
                    'Git is a version control system for tracking changes in computer files and coordinating work on those files among multiple people.',
                    'Advanced',
                    'GIT',
                    3,
                ),
                new Skill(
                    'Grunt is a JavaScript task runner, a tool used to automatically perform frequent tasks such as minification, compilation, unit testing, and linting. It uses a command-line interface to run custom tasks defined in a file.',
                    'Novice',
                    'Grunt',
                    1,
                ),
                new Skill(
                    'gulp.js is an open-source JavaScript toolkit by Fractal Innovations and the open source community at GitHub, used as a streaming build system in front-end web development.',
                    'Advanced',
                    'Gulp.js',
                    2,
                ),
                new Skill(
                    'HTML5 is a markup language used for structuring and presenting content on the World Wide Web. It is the fifth and current major version of the HTML standard.',
                    'Advanced',
                    'HTML 5',
                    4,
                ),
                new Skill(
                    'Java is a general-purpose computer programming language that is concurrent, class-based, object-oriented, and specifically designed to have as few implementation dependencies as possible.',
                    'Intermediate',
                    'Java',
                    2,
                ),
                new Skill(
                    'Jasmine is a behavior-driven development framework for testing JavaScript code. It does not depend on any other JavaScript frameworks. It does not require a DOM. And it has a clean, obvious syntax so that you can easily write tests.',
                    'Intermediate',
                    'Jasmine',
                    1,
                ),
                new Skill(
                    'JavaScript, often abbreviated as JS, is a high-level, dynamic, weakly typed, prototype-based, multi-paradigm, and interpreted programming language. ',
                    'Advanced',
                    'Javascript',
                    4,
                ),
                new Skill(
                    'jQuery is a cross-platform JavaScript library designed to simplify the client-side scripting of HTML. It is free, open-source software using the permissive MIT License.',
                    'Advanced',
                    'jQuery',
                    3,
                ),
                new Skill(
                    'Linux is a name that broadly denotes a family of free and open-source software operating systems built around the Linux kernel. Typically, Linux is packaged in a form known as a Linux distribution for both desktop and server use.',
                    'Advanced',
                    'Linux',
                    2,
                ),
                new Skill(
                    'Mocha is a JavaScript test framework running on node.js, featuring browser support, asynchronous testing, test coverage reports, and use of any assertion library.',
                    'Advanced',
                    'Mocha',
                    2,
                ),
                new Skill(
                    'MongoDB is a free and open-source cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with schemas.',
                    'Advanced',
                    'MongoDB',
                    2,
                ),
                new Skill(
                    'Moodle is a free and open-source learning management system written in PHP and distributed under the GNU General Public License.',
                    'Intermediate',
                    'Moodle',
                    1,
                ),
                new Skill(
                    'MySQL is an open-source relational database management system. Its name is a combination of "My", the name of co-founder Michael Widenius\'s daughter, and "SQL", the abbreviation for Structured Query Language.',
                    'Intermediate',
                    'MySQL',
                    1,
                ),
                new Skill(
                    'Nginx is a web server which can also be used as a reverse proxy, load balancer and HTTP cache. The software was created by Igor Sysoev and first publicly released in 2004. A company of the same name was founded in 2011 to provide support.',
                    'Advanced',
                    'Nginx',
                    2,
                ),
                new Skill(
                    'Node.js is an open-source, cross-platform JavaScript run-time environment for executing JavaScript code server-side.',
                    'Advanced',
                    'Node.js',
                    2,
                ),
                new Skill(
                    'Oracle offers a comprehensive and fully integrated stack of cloud applications and platform services.',
                    'Novice',
                    'Oracle',
                    1,
                ),
                new Skill(
                    'PostgreSQL, often simply Postgres, is an object-relational database management system with an emphasis on extensibility and standards compliance.',
                    'Intermediate',
                    'PostgreSQL',
                    2,
                ),
                new Skill(
                    'Python is an interpreted high-level programming language for general-purpose programming. Created by Guido van Rossum and first released in 1991, Python has a design philosophy that emphasizes code.',
                    'Intermediate',
                    'Python',
                    2,
                ),
                new Skill(
                    'Redis is an open-source in-memory database project implementing a distributed, in-memory key-value store with optional durability.',
                    'Advanced',
                    'Redis',
                    2,
                ),
                new Skill(
                    'Sass is a style sheet language initially designed by Hampton Catlin and developed by Natalie Weizenbaum.',
                    'Intermediate',
                    'Sass',
                    1,
                ),
                new Skill(
                    'Sequelize is a promise-based ORM for Node.js v4 and up. It supports the dialects PostgreSQL, MySQL, SQLite and MSSQL and features solid transaction support, relations, read replication and more.',
                    'Advanced',
                    'Sequelize',
                    2,
                ),
                new Skill(
                    'TypeScript is a free and open-source programming language developed and maintained by Microsoft. It is a strict syntactical superset of JavaScript, and adds optional static typing to the language.',
                    'Advanced',
                    'Typescript',
                    3,
                ),
            ],
            new SocialInformation(
                '',
                '',
                '',
                '',
            ),
            'resume-1',
            'barend-erasmus',
            [
                new WorkExperience(
                    'Synapseon',
                    true,
                    'Synapseon is a software company based in Cape Town, South Africa, and Vancouver, BC, Canada. We specialize in the design, development and support of medical and human resources applications for the cruise line industry.',
                    new Date(2017, 4, 1),
                    'Cape Town, South Africa',
                    'Software Engineer',
                    null,
                ),
                new WorkExperience(
                    'South African Database for Functional Measures',
                    false,
                    'The South African Database for Functional Measures’ (SADFM) primary mission is to contribute to the development of nursing as an empirical science in South Africa. To achieve this, the SADFM’s researched and developed new generation nursing measures on patient outcomes. The measures provide additional standardised data on patient improvement or decline.',
                    new Date(2016, 3, 1),
                    'Cape Town, South Africa',
                    'Software Engineer',
                    new Date(2017, 0, 1),
                ),
                new WorkExperience(
                    'Euromonitor International',
                    true,
                    'Passport is a global market research database providing insight on industries, economies and consumers worldwide, helping our clients analyse market context and identify future trends impacting businesses globally.',
                    new Date(2016, 2, 1),
                    'Cape Town, South Africa',
                    'Software Engineer',
                    null,
                ),
                new WorkExperience(
                    'Return True',
                    false,
                    'We have built a team of highly skilled individuals, all experts in the field of mobile applications, web applications, service-oriented architecture, real-time database systems and Business Intelligence. Our vision is to use our abilities, skill and diligence to be the first choice software product development company in South Africa.',
                    new Date(2014, 11, 1),
                    'Cape Town, South Africa',
                    'Full Stack Developer',
                    new Date(2016, 1, 1),
                ),
            ],
        );
    }
}
