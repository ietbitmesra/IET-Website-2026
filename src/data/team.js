const executive = [
	['ashwini-jha', 'Ashwini Jha', 'General Secretary', '#d6ff3f'],
	['karan-harsh-singh', 'Karan Harsh Singh', 'General Secretary', '#d6ff3f'],
	['yash-raj-dubey', 'Yash Raj Dubey', 'Joint Secretary', '#58c7ae'],
	['ankit-sahoo', 'Ankit Sahoo', 'Joint Secretary', '#58c7ae'],
	['prashant-pratap-singh', 'Prashant Pratap Singh', 'Treasurer', '#854f0b'],
	['swapnil-arya', 'Swapnil Arya', 'Joint Treasurer', '#0f6e56'],
	['shreshth-prasad', 'Shreshth Prasad', 'Webmaster', '#993c1d'],
	['anas-ghayas', 'Anas Ghayas', 'Public Relations Coordinator', '#b0447a'],
	['omkar-singh', 'Omkar Singh', 'Public Relations Coordinator', '#b0447a'],
	['swaraj-unde', 'Swaraj Unde', 'Events Head', '#0f6e56'],
	['aaroh-sinha', 'Aaroh Sinha', 'Events Head', '#0f6e56'],
	['ayush-agarwal', 'Ayush Agarwal', 'Tech Lead', '#2d6cdf'],
	['hitesh-bajaj', 'Hitesh Bajaj', 'Tech Lead', '#2d6cdf'],
	['shantanu-singh', 'Shantanu Singh', 'Design Head', '#534ab7'],
];

const photoUrls = {
	'aaroh-sinha': '/team-k24/aaroh-sinha.jpeg',
	'anas-ghayas': '/team-k24/anas-ghayas.jpg',
	'ankit-sahoo': '/team-k24/ankit-sahoo.jpg',
	'ashwini-jha': '/team-k24/ashwini-jha.jpg',
	'ayush-agarwal': '/team-k24/ayush-agarwal.jpg',
	'hitesh-bajaj': '/team-k24/Hitesh_Bajaj_TechLead.jpg',
	'karan-harsh-singh': '/team-k24/karan-harsh-singh.jpg',
	'omkar-singh': '/team-k24/omkar-singh.jpeg',
	'prashant-pratap-singh': '/team-k24/prashant-pratap-singh.jpg',
	'shantanu-singh': '/team-k24/shantanu-singh.jpeg',
	'shreshth-prasad': '/team-k24/shreshth-prasad.jpeg',
	'swapnil-arya': '/team-k24/swapnil-arya.jpg',
	'swaraj-unde': '/team-k24/swaraj-unde.jpg',
	'yash-raj-dubey': '/team-k24/yash-raj-dubey.jpg',
};

export const teamMembers = executive.map(([id, name, role, accent], index) => ({
	id,
	name,
	role,
	category: 'core',
	year: 'Executive Body 2026-27',
	photoUrl: photoUrls[id] || '',
	bio: `Leads ${role.toLowerCase()} initiatives across IET.`,
	links:
		({
			'ashwini-jha': {
					linkedin: 'https://www.linkedin.com/in/ashwini-jha-2a909a259/',
					instagram: 'https://www.instagram.com/ashwinii.jha/',
			},
			'karan-harsh-singh': {
				linkedin: 'http://www.linkedin.com/in/karan-singh-567a95319',
				instagram: 'https://www.instagram.com/karanharshsinghrathore?igsi=emg3eHphbWZ5b3R6',
			},
			'yash-raj-dubey': {
				instagram: 'https://www.instagram.com/yash_san01?igsi=MXB5a295ZXVheGtqeA==',
				linkedin: 'https://www.linkedin.com/in/yash-raj-dubey-327049391',
				gitlab: 'https://gitlab.com/yashraj0492843/',
			},
			'ankit-sahoo': {
				instagram: 'https://www.instagram.com/ankitt.hello/',
				linkedin: 'https://www.linkedin.com/in/ankit-sahoo-695136361/',
			},
			'prashant-pratap-singh': {
				instagram: 'https://www.instagram.com/passionate.pps?igsi=N3czdDRmemZ4ZDdo',
				linkedin: 'https://www.linkedin.com/in/prashant-pratap-singh-8217392a2/',
			},
			'swapnil-arya': {
				linkedin: 'https://www.linkedin.com/in/swapnil-arya-980186219/',
				instagram: 'https://www.instagram.com/__ariavis__/',
			},
			'shreshth-prasad': {
				linkedin: 'https://www.linkedin.com/in/shreshth-prasad-a72b2a307',
				instagram: 'https://www.instagram.com/shreshthprasad/',
			},
			'anas-ghayas': {
				linkedin: 'https://www.linkedin.com/in/anas-ghayas-5ab294294/',
				instagram: 'https://www.instagram.com/anasghayas_?igsi=MXZjYzM1ZWJ0cTN1cA==',
			},
			'omkar-singh': {
				linkedin: 'https://www.linkedin.com/in/omkar-singh-799305332/',
				instagram: 'https://www.instagram.com/frank__fy/',
			},
			'swaraj-unde': {
				linkedin: 'https://www.linkedin.com/in/swaraj-unde-280487316?utm_source=share_via&utm_content=profile&utm_medium=member_android',
				instagram: 'https://www.instagram.com/code_monarch_?igsi=MXN4ZGE4a2x2c2NhbQ==',
			},
			'ayush-agarwal': {
				linkedin: 'https://www.linkedin.com/in/ayushagarwal0206?utm_source=share_via&utm_content=profile&utm_medium=member_android',
				instagram: 'https://www.instagram.com/ayushagarwal2115?igsi=MTFlcmRkNDdvMmZvbg==',
			},
			'shantanu-singh': {
				linkedin: 'https://www.linkedin.com/in/shantanu-singh-b46984240/',
				instagram: 'https://www.instagram.com/shantanu_singh01/',
			},
			'hitesh-bajaj': {
				linkedin: 'https://www.linkedin.com/in/hitesh-bajaj-8b6520328/',
				instagram: 'https://www.instagram.com/hiteshbajajcp10/',
			},
			'aaroh-sinha': {
				linkedin: 'https://www.linkedin.com/in/aaroh-sinha-375a8a324?utm_source=share_via&utm_content=profile&utm_medium=member_android',
			},
		}[id] || {}),
	accent,
	displayOrder: index + 1,
}));

const findByRole = (role) => teamMembers.filter((member) => member.role === role);

export const executiveBody = {
	generalSecretary: findByRole('General Secretary'),
	jointSecretary: findByRole('Joint Secretary'),
	executives: teamMembers.filter(
		(member) => !['General Secretary', 'Joint Secretary'].includes(member.role),
	),
};

const k23Executive = [
	['raunak-kumar-tripathi', 'Raunak Kumar Tripathi', 'President', '#d6ff3f', 'Raunak_Kumar_Tripathi_President.jpeg'],
	['shubh-raj', 'Shubh Raj', 'Vice President', '#58c7ae', 'Shubh_Raj_Vice_Precident.jpg'],
	['suraj-agrawal', 'Suraj Kumar', 'Vice President', '#58c7ae', 'suraj-agrawal-vice-president.png'],
	['mukund-gupta', 'Mukund Gupta', 'Director', '#f2b84b', 'Mukund_Gupta_Director.png'],
	['aditya-kumar', 'Aditya Kumar', 'Senior Executive Body', '#80a9ff', 'Aditya_Kumar_Senior_Exe_Body.jpg'],
	['akshat-gupta', 'Akshat Gupta', 'Senior Executive Member', '#80a9ff', 'Akshat_Gupta_Executive_Body.png'],
];

export const k23TeamMembers = k23Executive.map(([id, name, role, accent, photo]) => ({
	id,
	name,
	role,
	category: 'core',
	year: 'K23 Executive Body',
	photoUrl: `/team-k23/${photo}`,
	bio: `Serves as ${role.toLowerCase()} for IET.`,
	links:
		({
			'raunak-kumar-tripathi': {
				linkedin: 'https://www.linkedin.com/in/rkt12/',
				instagram: 'https://www.instagram.com/rkt12_/',
			},
			'shubh-raj': {
				linkedin: 'https://linkedin.com/in/shubhraj62',
				instagram: 'https://www.instagram.com/shubh.raj62?stkn=cGN0NjJ1MjBrYzZ6',
			},
			'suraj-agrawal': {
				linkedin: 'https://www.linkedin.com/in/suraj-kumar-167a74300/',
				instagram: 'https://www.instagram.com/_suraj__agrawal__/',
			},
			'mukund-gupta': {
				linkedin: 'https://www.linkedin.com/in/mukund-gupta-',
			},
			'aditya-kumar': {
				linkedin: 'https://www.linkedin.com/in/aditya-234-',
				instagram: 'https://www.instagram.com/i_aditya_45_?stkn=MWRqbXFrYTJyejFxaA==',
			},
			'akshat-gupta': {
				linkedin: 'https://www.linkedin.com/in/akshatgupta3',
				instagram: 'https://www.instagram.com/axhat.g/',
			},
		}[id] || {}),
	accent,
}));


