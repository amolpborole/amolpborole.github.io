
public class Test {
	
	private static final String gFileStorePath;
	private static final String gFileFolderName = "packages/scriptconditions";
	private static final String gFileSptr = System.getProperty("file.separator");
	private static final String gFileNameExtnSeparator = ".";

	private static final Set<String> VALID_EXTENSION = new HashSet<>(Arrays.asList("sh", "ps1"));
	public static final String SCRIPT_TEMP_FOLDER_PATH = System.getProperty("java.io.tmpdir") + File.separator
			+ "scriptsTemp" + File.separator;

	private static final String FILE_EXTN_REGEX = "^[a-zA-Z0-9 _-]{1,200}\\.[a-zA-Z0-9]{1,10}";

	static {

		String path = System.getProperty("catalina.home");
		if (path == null || (path.trim()).length() == 0) {
			path = System.getProperty("user.dir");
			path = path + gFileSptr + "target";
		}
		StringBuilder strBldr = new StringBuilder(256);
		strBldr.append(path).append(gFileSptr).append("portalwebapp").append(gFileSptr).append("auth").append(gFileSptr)
				.append(gFileFolderName);

		gFileStorePath = strBldr.toString();
		File dir = new File(SCRIPT_TEMP_FOLDER_PATH);
		dir.mkdirs();
	}
	
	public static void main(String[] args) {
	    test1();
	}
	
	public static void test1() {
        
        String name = "abc";
        
        System.out.println(String.format("formatted message, name=%s", name));
	}

}
